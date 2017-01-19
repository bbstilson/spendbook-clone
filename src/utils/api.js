export function checkStatus({ data }) {
  if (data.status === 200) {
    return data;
  } else {
    throw new Error(data.msg);
  }
}
