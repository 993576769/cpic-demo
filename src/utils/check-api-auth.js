const SCOPE_MAP = {
  'scope.userLocation': '地理位置',
  'scope.writePhotosAlbum': '相册'
}

async function checkApiAuth(scope) {
  const fullScope = scope.startsWith('scope.') ? scope : `scope.${scope}`;
  try {
    await uni.authorize({ scope: fullScope });
    return true;
  } catch (e) {
    if (e.errMsg.indexOf('authorize:fail') !== -1) {
      const { confirm } = await uni.showModal({ content: `授权失败，请在设置中打开“${SCOPE_MAP[fullScope]}”开关后继续操作`, confirmText: '去设置' });
      if (confirm) {
        const { authSetting } = await uni.openSetting();
        if (authSetting[fullScope]) {
          return true;
        }
      }
    }
    throw e;
  }
}

export default checkApiAuth;
