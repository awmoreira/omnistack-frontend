import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';

import MembersActions from '../ducks/members';

export function* getMembers() {
  const response = yield call(api.get, 'members');

  yield put(MembersActions.getMembersSuccess(response.data));
}

export function* updateMember({ id, roles }) {
  try {
    yield call(api.put, `members/${id}`, { roles: roles.map(role => role.id) });

    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Membro atualizado',
        message: 'O membro foi atualizado com sucesso.',
      }),
    );
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro ao atualizar membro',
        message: 'O membro não foi atualizado, por favor tente mais tarde.',
      }),
    );
  }
}

export function* inviteMember({ email }) {
  try {
    yield call(api.post, 'invites', { invites: [email] });

    yield put(
      toastrActions.add({
        type: 'success',
        title: 'Convite enviado',
        message: 'O convite foi enviado com sucesso.',
      }),
    );
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Erro ao enviar convite',
        message: 'Por favor tente mais tarde.',
      }),
    );
  }
}
