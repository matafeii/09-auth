"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMe, updateMe } from "../../../../lib/api/clientApi";
import { useAuthStore } from "../../../../lib/store/authStore";
import css from "./EditProfilePage.module.css";

const EditProfilePage = () => {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [username, setUsername] = useState("");

  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(() => {
    if (user) {
      setUsername(user.username);
    }
  }, [user]);

  const updateProfileMutation = useMutation({
    mutationFn: updateMe,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      router.replace("/profile");
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateProfileMutation.mutate({ username });
  };

  const handleCancel = () => {
    router.push("/profile");
  };

  if (isLoading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>

          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={updateProfileMutation.isPending}
            >
              Save
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default EditProfilePage;
