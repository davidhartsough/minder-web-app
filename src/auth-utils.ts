function getGPUInfo(): string {
  const backupGPUInfo = localStorage.getItem("gpu_info");
  if (backupGPUInfo) return backupGPUInfo;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      (canvas.getContext("webgl") as WebGLRenderingContext) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext);
    if (!gl) return "no_webgl";
    const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    if (!debugInfo) return "no_debug_info";
    const renderer =
      gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) || "no_renderer";
    const vendor =
      gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) || "no_vendor";
    return `${renderer}${vendor}`.replace(/[^a-zA-Z]/g, "");
  } catch {
    return "webgl_error";
  }
}

function generateDeviceFingerprint(): string {
  const { userAgent, language, hardwareConcurrency, maxTouchPoints, platform } =
    navigator;
  // remove everything except alphabet characters
  const ua = userAgent.replace(/[^a-zA-Z]/g, "") || "ua";
  const gpuInfo = getGPUInfo();
  localStorage.setItem("gpu_info", gpuInfo);
  return [
    ua,
    language,
    gpuInfo,
    hardwareConcurrency || 0,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (navigator as any).deviceMemory || 0,
    maxTouchPoints || 0,
    platform || "x",
  ].join("_");
}

export function saveUID(bday: string): string {
  // if (!/^\d{4}-\d{2}-\d{2}$/.test(bday)) {
  //   throw new Error("Invalid birthday format. Expected YYYY-MM-DD.");
  // }
  const fingerprint = generateDeviceFingerprint();
  const uid = `u${bday}_${fingerprint}u`.replace(/[^a-zA-Z0-9_]/g, "");
  localStorage.setItem("uid", uid);
  return uid;
}
