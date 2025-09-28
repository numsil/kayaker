import { NextRequest, NextResponse } from 'next/server';
import { put, list, del } from '@vercel/blob';

const GALLERY_DATA_PREFIX = 'gallery-data';

// 기본 갤러리 데이터
const defaultGalleryData = [
  {
    id: 1,
    title: "장성호 멸망전",
    description: "2025 장성호 멸망전",
    date: "2025-09-28",
    competition: "장성호",
    imageUrl: "/winner.jpeg"
  }
];

// Blob Storage에서 데이터 읽기
async function readGalleryData() {
  try {
    // Blob Storage에서 갤러리 데이터 파일 목록 확인
    const blobs = await list({ prefix: GALLERY_DATA_PREFIX });

    if (blobs.blobs.length > 0) {
      // 가장 최신 파일 찾기 (uploadedAt으로 정렬)
      const latestBlob = blobs.blobs
        .filter(blob => blob.pathname.startsWith(GALLERY_DATA_PREFIX))
        .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime())[0];

      if (latestBlob) {
        const response = await fetch(latestBlob.url);
        if (response.ok) {
          const text = await response.text();
          const data = JSON.parse(text);
          return Array.isArray(data) ? data : defaultGalleryData;
        }
      }
    }

    // 파일이 없으면 기본 데이터 반환하고 새로 생성
    await writeGalleryData(defaultGalleryData);
    return defaultGalleryData;
  } catch (error) {
    console.error('Error reading gallery data:', error);
    return defaultGalleryData;
  }
}

// Blob Storage에 데이터 쓰기
async function writeGalleryData(data: any[]) {
  try {
    console.log('Writing gallery data:', data.length, 'items');

    if (!Array.isArray(data)) {
      console.error('Data is not an array:', typeof data);
      return false;
    }

    // 기존 갤러리 데이터 파일들 정리 (최신 3개만 유지)
    try {
      const existingBlobs = await list({ prefix: GALLERY_DATA_PREFIX });
      const galleryFiles = existingBlobs.blobs
        .filter(blob => blob.pathname.startsWith(GALLERY_DATA_PREFIX))
        .sort((a, b) => new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime());

      // 오래된 파일들 삭제 (최신 2개는 유지)
      if (galleryFiles.length > 2) {
        const filesToDelete = galleryFiles.slice(2);
        for (const file of filesToDelete) {
          await del(file.url);
          console.log('Deleted old gallery file:', file.pathname);
        }
      }
    } catch (cleanupError) {
      console.log('Cleanup warning (non-critical):', cleanupError);
    }

    const jsonData = JSON.stringify(data, null, 2);
    console.log('JSON data size:', jsonData.length, 'characters');

    // 타임스탬프를 포함한 고유한 파일명 생성
    const timestamp = Date.now();
    const filename = `${GALLERY_DATA_PREFIX}-${timestamp}.json`;

    const blob = await put(filename, jsonData, {
      access: 'public',
      contentType: 'application/json',
      addRandomSuffix: true
    });

    console.log('Blob written successfully:', blob.url);
    return true;
  } catch (error) {
    console.error('Error writing gallery data:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message, error.stack);
    }
    return false;
  }
}

// GET: 갤러리 데이터 조회
export async function GET() {
  try {
    const data = await readGalleryData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read gallery data' }, { status: 500 });
  }
}

// POST: 갤러리 아이템 추가
export async function POST(request: NextRequest) {
  try {
    const newItem = await request.json();
    const currentData = await readGalleryData();

    const itemWithId = {
      ...newItem,
      id: Date.now()
    };

    const updatedData = [...currentData, itemWithId];
    const success = await writeGalleryData(updatedData);

    if (success) {
      return NextResponse.json({ success: true, item: itemWithId });
    } else {
      return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add item' }, { status: 500 });
  }
}

// DELETE: 갤러리 아이템 삭제
export async function DELETE(request: NextRequest) {
  try {
    console.log('DELETE request received');

    const body = await request.json();
    console.log('Request body:', body);

    const { id } = body;

    if (!id) {
      console.error('No ID provided in delete request');
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    console.log('Deleting item with ID:', id);

    const currentData = await readGalleryData();
    console.log('Current data loaded:', currentData.length, 'items');

    const updatedData = currentData.filter((item: any) => item.id !== id);
    console.log('Filtered data:', updatedData.length, 'items remaining');

    const success = await writeGalleryData(updatedData);
    console.log('Write operation success:', success);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      console.error('Failed to write updated data');
      return NextResponse.json({ error: 'Failed to save updated data' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in DELETE operation:', error);
    return NextResponse.json({
      error: 'Failed to delete item',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}