export const genericFetchWithTokenBody = async (url, method, token, body) =>
  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body,
  }).then((res) => {
    console.log("fetch with Token" + JSON.stringify(res));
    if (!res.ok) {
      console.log("not okay");
      throw new Error(res.status);
    } else {
      return res;
    }
  });

export const PatchWithTokenBody = async (url, method, token, body) =>
  fetch(url, {
    method,
    headers: {
      "Content-Type": "application/merge-patch+json",
      Accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body,
  }).then((res) => {
    console.log("patch with Token" + JSON.stringify(res));
    if (!res.ok) {
      console.log("not okay");
      throw new Error(res.status);
    } else {
      return res;
    }
  });
