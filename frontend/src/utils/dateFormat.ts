/**
   * Converte o formato de data.
   * @param dataString data com formato a ser convertido.
   * @returns Data no formato DD/MM/AAAA.
   */

export default function convertDateFormat(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
}