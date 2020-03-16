import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  componentDidMount() {
    if (localStorage.getItem('token')) {
      this.props.history.push('/');
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    // console.log('hahaa');

    axios
      .post('http://localhost:4444/user/login', this.state)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user-id', res.data.id);
        localStorage.setItem('status', res.data.status);
        localStorage.setItem('isAuth', true);
        this.props.history.push('/');
      })

      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div
        className='container'
        style={{ marginTop: '150px', backgroundColor: 'aqua' }}
      >
        <div className='card'>
          <div className='row justify-content-md-center'>
            <div className='col-md-8 my-4'>
              <form>
                <div className='form-group'>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='Enter email'
                    name='email'
                    onChange={this.onChange}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Enter password'
                    name='password'
                    onChange={this.onChange}
                  />
                </div>
                <button
                  onClick={this.onSubmit}
                  type='submit'
                  className='btn btn-primary'
                >
                  Login
                </button>
                ||
                <Link className='btn btn-warning' to={'/Register'}>
                  Register
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;