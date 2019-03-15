import { call, put } from 'redux-saga/effects';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';

import ProjectsActions from '../ducks/projects';

export function* getProjects() {
  const response = yield call(api.get, 'projects');

  yield put(ProjectsActions.getProjectsSuccess(response.data));
}

export function* addProject({ title }) {
  try {
    const response = yield call(api.post, 'projects', { title });

    yield put(ProjectsActions.addProjectSuccess(response.data));
    yield put(ProjectsActions.closeProjectModal());
  } catch (err) {
    yield put(
      toastrActions.add({
        type: 'error',
        title: 'Falha ao criar projeto',
        message: 'Por favor tente novamente mais tarde.',
      }),
    );
  }
}
