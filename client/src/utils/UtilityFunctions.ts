import { Status } from './Enums';

export function TranslateStatus(status: Status | undefined) {
  switch (status) {
    case Status.Active:
      return 'Aktyvus';

    case Status.Complete:
      return 'Įvykdytas';

    case Status.Deleted:
      return 'Ištrintas';

    default:
      return '';
  }
}

export function TranslateTimeLine(id: string | undefined) {
  if (!id) return '';

  switch (+id) {
    case 0:
      return 'Kuo skubiau';

    case 1:
      return 'Per artimiausius tris mėnesius';

    case 2:
      return 'Aš esu lankstus';

    case 3:
      return 'Specifiška data';

    default:
      return '';
  }
}
