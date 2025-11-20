
function getUserKey(user) {
  const uidLike = user?.uid || user?.email || 'guest';
  return `profileExtras_${uidLike}`;
}


export function getExtras(user) {
  try {
    const key = getUserKey(user);
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}


export function setExtras(user, extras) {
  const key = getUserKey(user);
  const clean = {

    occupation: extras?.occupation || '',
    location: extras?.location || '',
    phone: extras?.phone || '',
    facebook: extras?.facebook || '',
    github: extras?.github || '',
    linkedin: extras?.linkedin || '',
  };
  localStorage.setItem(key, JSON.stringify(clean));
  return clean;
}


export function clearExtras(user) {
  const key = getUserKey(user);
  localStorage.removeItem(key);
}
