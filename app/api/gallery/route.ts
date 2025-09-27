import { NextRequest, NextResponse } from 'next/server';
import { put, list } from '@vercel/blob';

const GALLERY_DATA_KEY = 'gallery-data.json';

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
    // Blob Storage에서 데이터 파일 목록 확인
    const blobs = await list({ prefix: GALLERY_DATA_KEY });

    if (blobs.blobs.length > 0) {
      // 정확한 파일명으로 찾기
      const dataBlob = blobs.blobs.find(blob => blob.pathname === GALLERY_DATA_KEY);

      if (dataBlob) {
        const response = await fetch(dataBlob.url);
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
    const jsonData = JSON.stringify(data, null, 2);
    const blob = await put(GALLERY_DATA_KEY, jsonData, {
      access: 'public',
      contentType: 'application/json'
    });
    return true;
  } catch (error) {
    console.error('Error writing gallery data:', error);
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
    const { id } = await request.json();
    const currentData = await readGalleryData();

    const updatedData = currentData.filter((item: any) => item.id !== id);
    const success = await writeGalleryData(updatedData);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete item' }, { status: 500 });
  }
}