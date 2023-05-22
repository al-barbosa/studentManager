/**
   * Em caso de mais de um nome, isola o primeiro no do usuário.
   * @param fullName Nome completo.
   * @returns Primeiro nome.
   */


export default function getFirstName(fullName: string): string {
  const names = fullName.split(' ');
  return names[0];
};