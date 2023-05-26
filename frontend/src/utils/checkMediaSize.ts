/**
 * Verifica o tamanho da tela e retorna a valor para dimensionar a imagem.
 */
// 
const checkMediaSize = (): string => {
  const mediaQuery = window.matchMedia("(min-width: 450px)");
  if (mediaQuery.matches) {
    return '60';
  } else {
    return '40';
  }
};

export default checkMediaSize;