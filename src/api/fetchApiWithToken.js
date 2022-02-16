export const genericFetchWithToken = async (url, method, token) =>
fetch(url, { method, headers: {"Content-Type": "application/json",
Accept: "application/json",
Authorization:'Bearer ' + token} }).then(res => {
  console.log("fetch with Token", res)
    if (!res.ok) {
      console.log("not okay")
      throw new Error(res.status);
    } else {
      return res;
    }
  })