import Button from "@mui/material/Button";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";

function LoginPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    function handlerSubmit(e) {
        e.preventDefault();

        if (!name || !email || !password) {
            setError('All Fileds are Must Be Filled');
            return;
        }
        navigate('/userInformations');
    }

    return (
        <>
            <div className="buttonPosition">
                <Button variant="contained" color="success" onClick={() => setLoggedIn(true)}>Login</Button> &nbsp;
                <Button variant="contained" color="error" onClick={() => setLoggedIn(false)}>Logout</Button>

                {
                    isLoggedIn &&
                    <form onSubmit={handlerSubmit}>
                        <h1>Login Page</h1>
                        <FormControl>
                            <InputLabel>Name:</InputLabel>
                            <Input type="text" placeholder="Enter Your Name"
                                value={name} onChange={(e) => setName(e.target.value)} />
                        </FormControl> <br /> <br />

                        <FormControl>
                            <InputLabel>Email:</InputLabel>
                            <Input type="email" placeholder="Enter Your Email"
                                value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormControl> <br /> <br />

                        <FormControl>
                            <InputLabel>Password:</InputLabel>
                            <Input type="password" placeholder="Enter Your Password"
                                value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormControl> <br /> <br />

                        <FormControl>
                            <Button variant="contained" color="success" type="submit">Submit</Button>
                        </FormControl> <br />
                    </form>
                }

                {error && <p style={{ color: 'red' }}>All Field are Must Filed</p>}
            </div>
        </>
    )
}

export default LoginPage;