"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@/ui/card";
import PillButton from "@/ui/pill-button";

const encodeFileToBase64 = (image: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = (event: any) => resolve(event.target.result);
    reader.onerror = (error) => reject(error);
  });
};

export default function Page() {
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [base64Image, setBase64Image] = useState<{ image: File; url: any }>();
  const [bio, setBio] = useState("");

  useEffect(() => {
    if (avatar) {
      encodeFileToBase64(avatar).then((base64Image) => {
        setBase64Image({ image: avatar, url: base64Image });
      });
    }
  }, [avatar]);

  return (
    <div>
      <h1>Register Page</h1>
    </div>
  );
}
