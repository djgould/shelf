import { connection } from "next/server";

export const DEMO_USER = {
  id: "demo-user",
  name: "Sam Rivera",
  email: "sam.rivera@example.com",
};

// TODO: replace with real sign-in
export async function getCurrentUser() {
  await connection();
  return DEMO_USER;
}
