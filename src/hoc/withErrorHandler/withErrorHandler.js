import React, { Component } from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrapperComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    componentDidMount() {
      axios.interceptors.request.use(req => {
        console.log(req);
        this.setState({error: null});
        return req;
      });

      axios.interceptors.response.use(res => res, error => {
        console.log(error);
        this.setState({error: error});
      });
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render() {
      return (
        <Auxiliary>
          <Modal
            show={this.state.error}
            modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrapperComponent {...this.props} />
        </Auxiliary>
      );
    }
  }
}

export default withErrorHandler;