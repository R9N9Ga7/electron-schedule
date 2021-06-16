export function setSemester(obj) {
  localStorage.setItem('semester', JSON.stringify(obj));
}

export function getSemester() {
  return JSON.parse(localStorage.getItem('semester')) || { ID: '5:94052826', NAME: '2020-О' };
}
