import http from "./index";

export function customerList(data) {
  return http({
    url: "customer/list",
    params: data,
    method: "get",
  });
}

export function customerSave(data) {
  return http({
    url: "customer/save",
    data,
    method: "post",
  });
}

export function customerUpdate(data) {
  return http({
    url: "customer/update",
    data,
    method: "post",
  });
}
