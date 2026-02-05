import { useDispatch, useSelector } from "react-redux";
import { deleteUsers } from "../slices/formSlices";
import { useNavigate } from "react-router-dom";
import Table from '@mui/material/Table';
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import './FormStyles.css';
import {v4 as uuid} from 'uuid';

function UserDetailsDisplay() {
    const selectors = useSelector(state => state.form.users);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>
            <h1 className="headingSize">Personal Details Display</h1>
            <Button variant="contained" color="success" onClick={() => navigate('/userInformations')}>Add users</Button>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>S.Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Age</TableCell>
                            <TableCell align="right">DOB</TableCell>
                            <TableCell align="right">Country</TableCell>
                            <TableCell align="right">City</TableCell>
                            <TableCell align="right">Address</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {
                            selectors.map((item,index) => {
                                return <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}  
                                        >
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell component="th" scope="row">{item.name}</TableCell>
                                    <TableCell align="right">{item.email}</TableCell>
                                    <TableCell align="right">{item.age}</TableCell>
                                    <TableCell align="right">{item.dob}</TableCell>
                                    <TableCell align="right">{item.country}</TableCell>
                                    <TableCell align="right">{item.city}</TableCell>
                                    <TableCell align="right">{item.address}</TableCell>
                                    <TableCell align="right">
                                        <Button variant="contained" color="success" onClick={() => navigate(`/userInformations/${item.id}`)}>Update</Button> &nbsp;
                                        <Button variant="contained" color="error" onClick={() => dispatch(deleteUsers(item.id))}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default UserDetailsDisplay;