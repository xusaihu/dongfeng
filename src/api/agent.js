import http from "./index";

export function agentList(data) {
  return http({
    url: "agent/list",
    params: data,
    method: "get",
  });
}

export function agentSave(data) {
  return http({
    url: "agent/save",
    data,
    method: "post",
  });
}
