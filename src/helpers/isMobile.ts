const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
const isMobile = (): boolean => regex.test(window.navigator.userAgent);

export default isMobile;
