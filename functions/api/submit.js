export async function onRequestPost(context) {
  const { request, env } = context;
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  try {
    const body = await request.text();
    const key = "acc_" + Date.now();
    await env.USER_ACCOUNT_STORE.put(key, body);
    return new Response(JSON.stringify({ ok: true, msg: "账号提交成" }), { headers: corsHeaders });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, msg: "服务器异常" }), { headers: corsHeaders });
  }
}

export async function onRequestOptions() {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };
  return new Response(null, { headers: corsHeaders });
}

