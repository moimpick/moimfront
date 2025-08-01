"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8000/api/test");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text(); // String으로 반환되므로 text() 사용
        setMessage(data);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500 text-lg">에러: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Spring Boot API 테스트</h1>

      <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6">
        <h2 className="text-xl font-semibold mb-2">서버 응답:</h2>
        <p className="text-lg">{message}</p>
      </div>

      <div className="text-sm text-gray-600">
        <p>API 엔드포인트: http://localhost:8000/api/test</p>
        <p>응답 시간: {new Date().toLocaleTimeString()}</p>
      </div>
    </div>
  );
}
