import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';

import TeamsActions from '../ducks/teams';

export function* getTeams() {
  const response = yield call(api.get, 'teams');

  yield put(TeamsActions.getTeamsSuccess(response.data));
}

export function* addTeam({ name }) {
  try {
    const response = yield call(api.post, 'teams', { name });

    yield put(TeamsActions.addTeamSuccess(response.data));
    yield put(TeamsActions.closeTeamModal());
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao criar time',
        message: 'Por favor tente novamente mais tarde.',
      }),
    );
  }
}
