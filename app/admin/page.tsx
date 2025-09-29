"use client";

import { useState } from "react";
import Image from "next/image";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  date: string;
  competition: string;
  imageUrl: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [showForm, setShowForm] = useState(false);

  // 갤러리 데이터 로드
  const loadGalleryData = async () => {
    try {
      const response = await fetch('/api/gallery');
      if (response.ok) {
        const data = await response.json();
        setGalleryItems(data);
      }
    } catch (error) {
      console.error('Error loading gallery data:', error);
    }
  };

  // 로그인 성공 시 데이터 로드
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    loadGalleryData();
  };

  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    date: "",
    competition: "",
    imageUrl: "",
    actualImageUrl: "",
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "kayaker2025") {
      handleLoginSuccess();
    } else {
      alert("비밀번호가 틀렸습니다.");
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();

    const itemData = {
      title: newItem.title,
      description: newItem.description,
      date: newItem.date,
      competition: newItem.competition,
      imageUrl: newItem.actualImageUrl || newItem.imageUrl,
    };

    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemData),
      });

      if (response.ok) {
        const result = await response.json();
        setGalleryItems([...galleryItems, result.item]);
        setNewItem({
          title: "",
          description: "",
          date: "",
          competition: "",
          imageUrl: "",
          actualImageUrl: "",
        });
        setShowForm(false);
        alert("사진이 추가되었습니다!");
      } else {
        alert("사진 추가 실패");
      }
    } catch (error) {
      console.error('Error adding item:', error);
      alert("사진 추가 중 오류가 발생했습니다.");
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      try {
        const response = await fetch('/api/gallery', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });

        if (response.ok) {
          setGalleryItems(galleryItems.filter((item) => item.id !== id));
          alert("삭제되었습니다.");
        } else {
          alert("삭제 실패");
        }
      } catch (error) {
        console.error('Error deleting item:', error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  // 이미지 압축 함수
  const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.7): Promise<File> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }
      const img = document.createElement('img');

      img.onload = () => {
        // 비율 유지하면서 크기 조정
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // 이미지 그리기
        ctx.drawImage(img, 0, 0, width, height);

        // Blob으로 변환
        canvas.toBlob((blob) => {
          if (blob) {
            const compressedFile = new File([blob], file.name, {
              type: 'image/jpeg',
              lastModified: Date.now(),
            });
            resolve(compressedFile);
          }
        }, 'image/jpeg', quality);
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // 이미지 압축 (800px 폭, 70% 품질)
        const compressedFile = await compressImage(file, 800, 0.7);

        // 미리보기를 위한 FileReader
        const reader = new FileReader();
        reader.onloadend = () => {
          setNewItem({ ...newItem, imageUrl: reader.result as string });
        };
        reader.readAsDataURL(compressedFile);

        // 실제 파일 업로드 (압축된 파일 사용)
        const formData = new FormData();
        formData.append('file', compressedFile);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setNewItem(prev => ({ ...prev, actualImageUrl: result.url }));
        } else {
          const errorData = await response.json();
          alert(`이미지 업로드 실패: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Upload error:', error);
        alert('이미지 업로드 실패');
      }
    }
  };

  const downloadData = () => {
    const dataStr = JSON.stringify(galleryItems, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "gallery-data.json";
    link.click();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">갤러리 관리</h1>
          <div className="flex gap-4">
            <button
              onClick={downloadData}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              데이터 다운로드
            </button>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {showForm ? "취소" : "사진 추가"}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <h2 className="text-2xl font-bold mb-4">새 사진 추가</h2>
            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  이미지 업로드
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  최대 1MB, 자동으로 800px 폭으로 압축됩니다.
                </p>
                {newItem.imageUrl && (
                  <div className="mt-4 relative w-40 h-40">
                    <Image
                      src={newItem.imageUrl}
                      alt="미리보기"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">제목</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) =>
                    setNewItem({ ...newItem, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">설명</label>
                <input
                  type="text"
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">날짜</label>
                <input
                  type="date"
                  value={newItem.date}
                  onChange={(e) =>
                    setNewItem({ ...newItem, date: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  카테고리
                </label>
                <input
                  type="text"
                  value={newItem.competition}
                  onChange={(e) =>
                    setNewItem({ ...newItem, competition: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="예: 장성호"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
              >
                추가하기
              </button>
            </form>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-4">
            등록된 사진 ({galleryItems.length}개)
          </h2>
          {galleryItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              등록된 사진이 없습니다.
            </p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="relative aspect-square">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-600">{item.competition}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="mt-2 w-full bg-red-500 text-white py-1 rounded text-sm hover:bg-red-600"
                    >
                      삭제
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-bold text-yellow-800 mb-2">
            📌 사용 방법 안내
          </h3>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. "사진 추가" 버튼을 클릭합니다.</li>
            <li>2. 이미지 파일을 업로드하고 정보를 입력합니다.</li>
            <li>3. "추가하기" 버튼으로 저장합니다.</li>
            <li>4. "데이터 다운로드"로 JSON 파일을 받을 수 있습니다.</li>
            <li>
              5. 다운로드한 파일을 개발자에게 전달하면 웹사이트에 반영됩니다.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}