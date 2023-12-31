import React from 'react';

class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

            signinEmail: '',
            signinPassword: ''
        }
    }

    onEmailchange = (event) => {
        this.setState({ signinEmail: event.target.value });
    }

    onPasswordchange = (event) => {
        this.setState({signinPassword: event.target.value});
    }

    onSubmitChange = () => {
        fetch('https://smart-brain-orlf.onrender.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signinEmail,
                password: this.state.signinPassword
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.id) {
                this.props.loadUser(data)
                console.log(data);
                this.props.onRouteChange('home');
            }
        })
        

    }


    render() {
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" onChange = {this.onEmailchange} />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange = {this.onPasswordchange} />
                            </div>

                        </fieldset>
                        <div className="">
                            <input onClick={this.onSubmitChange} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
                        </div>
                        <div className="lh-copy mt3">
                            <p onClick={() => onRouteChange('register')} className="f6 link dim black pointer db">Register</p>
                        </div>
                    </div>
                </main>
            </article>

        )
    }


}

export default Signin;