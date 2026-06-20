import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBoxI55pCO3O-ktFqIUGc5SACA0x5KshUo",
  authDomain: "come-follow-me-app-f8596.firebaseapp.com",
  projectId: "come-follow-me-app-f8596",
  storageBucket: "come-follow-me-app-f8596.firebasestorage.app",
  messagingSenderId: "15453094101",
  appId: "1:15453094101:web:c8068dc6e13a65ad48e25c",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// ── User profile ──────────────────────────────────────────────────────────────
export async function saveUserProfile(userId, profile) {
  await setDoc(doc(db, "users", userId), {
    ...profile,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

export async function getUserProfile(userId) {
  const snap = await getDoc(doc(db, "users", userId));
  return snap.exists() ? snap.data() : null;
}

// ── Group management ──────────────────────────────────────────────────────────
export async function createGroup(groupCode, creatorId, groupName) {
  await setDoc(doc(db, "groups", groupCode.toUpperCase()), {
    name: groupName,
    createdBy: creatorId,
    createdAt: serverTimestamp(),
    members: [creatorId],
  });
}

export async function getGroup(groupCode) {
  const snap = await getDoc(doc(db, "groups", groupCode.toUpperCase()));
  return snap.exists() ? snap.data() : null;
}

export async function joinGroup(groupCode, userId) {
  const code = groupCode.toUpperCase();
  const group = await getGroup(code);
  if (!group) return { error: "Group not found. Check the code and try again." };
  const members = group.members || [];
  if (!members.includes(userId)) {
    await setDoc(doc(db, "groups", code), {
      members: [...members, userId],
    }, { merge: true });
  }
  return { success: true, group: { ...group, code } };
}

export async function removeMember(groupCode, userIdToRemove) {
  const code = groupCode.toUpperCase();
  const group = await getGroup(code);
  if (!group) return { error: "Group not found." };
  const members = (group.members || []).filter(id => id !== userIdToRemove);
  await setDoc(doc(db, "groups", code), { members }, { merge: true });
  return { success: true };
}

// ── Progress sync ─────────────────────────────────────────────────────────────
export async function syncProgress(userId, weekNumber, dayIndex, completedItems, currentDay) {
  await setDoc(doc(db, "progress", `${userId}_w${weekNumber}`), {
    userId,
    weekNumber,
    currentDay,
    completedCount: Object.values(completedItems).filter(Boolean).length,
    totalItems: Object.keys(completedItems).length,
    updatedAt: serverTimestamp(),
  }, { merge: true });
}

// ── Daily highlight (share a thought) ────────────────────────────────────────
export async function saveHighlight(userId, displayName, weekNumber, dayIndex, text) {
  const id = `${userId}_w${weekNumber}_d${dayIndex}`;
  await setDoc(doc(db, "highlights", id), {
    userId, displayName, weekNumber, dayIndex, text,
    createdAt: serverTimestamp(),
  });
}

// ── Live group members listener ───────────────────────────────────────────────
export function listenToGroupMembers(memberIds, callback) {
  if (!memberIds || memberIds.length === 0) return () => {};
  const unsubscribers = [];
  const memberData = {};

  memberIds.forEach(uid => {
    const unsub = onSnapshot(doc(db, "users", uid), snap => {
      if (snap.exists()) {
        memberData[uid] = snap.data();
        callback({ ...memberData });
      }
    });
    unsubscribers.push(unsub);
  });

  return () => unsubscribers.forEach(u => u());
}

export function listenToGroupHighlights(memberIds, weekNumber, callback) {
  if (!memberIds || memberIds.length === 0) return () => {};
  const unsubscribers = [];
  const allHighlights = {};

  memberIds.forEach(uid => {
    for (let day = 0; day < 7; day++) {
      const id = `${uid}_w${weekNumber}_d${day}`;
      const unsub = onSnapshot(doc(db, "highlights", id), snap => {
        if (snap.exists()) {
          allHighlights[id] = snap.data();
        } else {
          delete allHighlights[id];
        }
        callback(Object.values(allHighlights).sort((a, b) => a.dayIndex - b.dayIndex));
      });
      unsubscribers.push(unsub);
    }
  });

  return () => unsubscribers.forEach(u => u());
}

// ── Generate a random user ID ─────────────────────────────────────────────────
export function generateUserId() {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}

// ── Generate a random 6-letter group code ─────────────────────────────────────
export function generateGroupCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}
