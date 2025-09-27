import { NextRequest, NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'gallery.json');

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

// 데이터 파일 읽기
async function readGalleryData() {
  try {
    const data = await readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // 파일이 없으면 기본 데이터 반환
    return defaultGalleryData;
  }
}

// 데이터 파일 쓰기
async function writeGalleryData(data: any[]) {
  try {
    // data 디렉토리 생성
    const dataDir = path.dirname(DATA_FILE);
    await writeFile(dataDir + '/.gitkeep', '');

    await writeFile(DATA_FILE, JSON.stringify(data, null, 2));
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