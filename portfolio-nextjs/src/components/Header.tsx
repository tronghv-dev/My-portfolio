"use client";

import { useEffect, useState } from "react";
import type { Profile } from "@/types/profile";

const DEFAULT = {
  name: "Hoàng Văn Trọng",
  badges: ["Lập trình web, mobile app", "fullstack developer"],
  jobPosition: "Intern developer",
  email: "tronghv.contact@gmail.com",
  phone: "0978004644",
};

export default function Header() {
  const [profile, setProfile] = useState<Partial<Profile>>(DEFAULT);

  useEffect(() => {
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data: Profile) => setProfile(data))
      .catch(() => {});
  }, []);

  return (
    <header>
      <div className="container header__container">
        {/* left col */}
        <div className="header__column--left">
          <div
            className="header__img"
            style={
              profile.avatarUrl
                ? { backgroundImage: `url(${profile.avatarUrl})` }
                : undefined
            }
          />
          <div className="header__content--left">
            <h2>{profile.name}</h2>
            <div className="header__badge--container">
              {(profile.badges ?? DEFAULT.badges).map((b) => (
                <div key={b} className="badge">
                  {b}
                </div>
              ))}
            </div>
            <p>
              Mong muốn ứng tuyển vị trí <span>{profile.jobPosition}</span>{" "}
              trong lĩnh vực lập trình web
            </p>
          </div>
        </div>

        {/* right col */}
        <div className="header__column--right">
          <h2 className="header__title">Thông Tin Liên Hệ</h2>
          <p>
            Gửi Email cho mình tại: <span>{profile.email}</span>
          </p>
          <p>
            Gọi cho mình tại: <span>{profile.phone}</span>
          </p>
        </div>
      </div>
    </header>
  );
}
