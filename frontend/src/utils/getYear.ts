/**
   * Converte o formato de data.
   * @param dataString data com formato a ser convertido.
   * @returns Data no formato DD/MM/AAAA.
   */

export default function getYear(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear().toString();

  return `${year}`;
}