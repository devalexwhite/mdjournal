"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [theme, setTheme] = useState("light");
  const [downloadButton, setDownloadButton] = useState(false);
  const [profileLink, setProfileLink] = useState(false);
  const [user, setUser] = useState(null) as [User | null, Function];
  const [profile, setProfile] = useState(null) as [any | null, Function];
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const supabase = createClient();

  const getUser = async () => {
    const { data: user } = await supabase.auth.getUser();

    if (user) {
      setUser(user?.user);

      const { data: profile } = await supabase
        .from("profiles")
        .select()
        .eq("id", user?.user?.id)
        .single();

      setProfile(profile);

      setTheme(profile?.theme || "light");
      setDownloadButton(profile?.download_button);
      setProfileLink(profile?.profile_link);
    } else {
      router.push("/login");
    }

    setLoading(false);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    supabase
      .from("profiles")
      .update({
        theme,
        show_download: downloadButton,
        show_profile_link: profileLink,
      })
      .eq("id", user?.id)
      .then(() => {
        setLoading(false);
      });
  };

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (document && rootRef.current)
      rootRef.current.setAttribute("data-theme", theme);
  }, [theme, rootRef]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full h-screen" ref={rootRef}>
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 mt-16">
        <h1 className="text-3xl font-black">options.</h1>

        {loading && (
          <div className="w-full h-full flex items-center justify-center mt-16">
            <LoadingSpinner />
          </div>
        )}

        {!loading && (
          <form onSubmit={onSubmit}>
            <div className="form-control">
              <label htmlFor="theme" className="label">
                <span className="label-text">color theme</span>
                <select
                  name="theme"
                  id="theme"
                  className="select select-bordered"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="cupcake">Cupcake</option>
                  <option value="bumblebee">Bumblebee</option>
                  <option value="emerald">Emerald</option>
                  <option value="corporate">Corporate</option>
                  <option value="synthwave">Synthwave</option>
                  <option value="retro">Retro</option>
                  <option value="cyberpunk">Cyberpunk</option>
                  <option value="valentine">Valentine</option>
                  <option value="halloween">Halloween</option>
                  <option value="garden">Garden</option>
                  <option value="forest">Forest</option>
                  <option value="aqua">Aqua</option>
                  <option value="lofi">Lofi</option>
                  <option value="pastel">Pastel</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="wireframe">Wireframe</option>
                  <option value="black">Black</option>
                  <option value="luxury">Luxury</option>
                  <option value="dracula">Dracula</option>
                  <option value="cmyk">CMYK</option>
                  <option value="autumn">Autumn</option>
                  <option value="business">Business</option>
                  <option value="acid">Acid</option>
                  <option value="lemonade">Lemonade</option>
                  <option value="night">Night</option>
                  <option value="coffee">Coffee</option>
                  <option value="winter">Winter</option>
                  <option value="dim">Dim</option>
                  <option value="nord">Nord</option>
                  <option value="sunset">Sunset</option>
                </select>
              </label>
            </div>

            <div className="form-control">
              <label htmlFor="download-button" className="label">
                <span className="label-text">
                  show download button on posts?
                </span>
                <input
                  checked={downloadButton}
                  onChange={(e) => setDownloadButton(e.target.checked)}
                  type="checkbox"
                  name="download-button"
                  id="download-button"
                  className="checkbox"
                />
              </label>
            </div>
            <div className="form-control">
              <label htmlFor="profile-link" className="label cursor-pointer">
                <span className="label-text">
                  link to your profile on posts?
                </span>
                <input
                  checked={profileLink}
                  onChange={(e) => setProfileLink(e.target.checked)}
                  type="checkbox"
                  name="profile-link"
                  id="profile-link"
                  className="checkbox"
                />
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary mt-4"
              onClick={onSubmit}
            >
              save options.
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
