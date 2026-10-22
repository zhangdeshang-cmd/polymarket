export async function onRequestPost(context) {
  const { request, env } = context;
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type"
  };

  try {
    const payload = await request.json();
    const account = payload.account?.trim();
    if (!account) {
      return new Response(JSON.stringify({ ok: false, msg: "账号不能为空" }), { headers: corsHeaders });
    }
    const key = `acc_${Date.now()}`;
    const saveData = JSON.stringify({
      account: account,
      time: new Date().toLocaleString()
    });
    await env.USER_ACCOUNT_STORE.put(key, saveData);
    return new Response(JSON.stringify({ ok: true, msg: "账号提交成功" }), { headers: corsHeaders });
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
