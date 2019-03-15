import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ProjectsActions from '../../store/ducks/projects';
import MembersActions from '../../store/ducks/members';

import Button from '../../styles/components/Button';
import Modal from '../Modal';
import Can from '../Can';
import Members from '../Members';

import { Container, Project } from './styles';

class Projects extends Component {
  static propTypes = {
    getProjectsRequest: PropTypes.func.isRequired,
    openProjectModal: PropTypes.func.isRequired,
    closeProjectModal: PropTypes.func.isRequired,
    addProjectRequest: PropTypes.func.isRequired,
    openMembersModal: PropTypes.func.isRequired,
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }),
    projects: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
        }),
      ),
      projectModalOpen: PropTypes.bool,
    }).isRequired,
    membersModalOpen: PropTypes.bool.isRequired,
  };

  static defaultProps = {
    activeTeam: null,
  };

  state = {
    newProject: '',
  };

  componentDidMount() {
    const { activeTeam, getProjectsRequest } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCreateProject = (e) => {
    e.preventDefault();

    const { addProjectRequest } = this.props;
    const { newProject } = this.state;

    addProjectRequest(newProject);
  };

  render() {
    const {
      activeTeam,
      projects,
      closeProjectModal,
      openProjectModal,
      openMembersModal,
      membersModalOpen,
    } = this.props;

    const { newProject } = this.state;

    if (!activeTeam) return null;

    return (
      <Container>
        <header>
          <h1>{activeTeam.name}</h1>
          <div>
            <Can checkPermission="projects_create">
              <Button onClick={openProjectModal}>+ Novo</Button>
            </Can>
            <Button onClick={openMembersModal}>Membros</Button>
          </div>
        </header>

        {projects
          && projects.data.map(project => (
            <Project key={project.id}>
              <p>{project.title}</p>
            </Project>
          ))}

        {projects.projectModalOpen && (
          <Modal>
            <h1>Criar Projeto</h1>

            <form onSubmit={this.handleCreateProject}>
              <span>Título</span>
              <input name="newProject" value={newProject} onChange={this.handleInputChange} />

              <Button size="big" type="submit">
                Salvar
              </Button>
              <Button onClick={closeProjectModal} size="small" color="gray">
                Cancelar
              </Button>
            </form>
          </Modal>
        )}

        {membersModalOpen && <Members />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
  projects: state.projects,
  membersModalOpen: state.members.membersModalOpen,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...ProjectsActions, ...MembersActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects);
