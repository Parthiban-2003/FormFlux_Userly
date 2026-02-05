import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addUsers , updateUsers } from "../slices/formSlices";
import { v4 as uuid } from "uuid";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import FormControl from "@mui/material/FormControl";
import "./FormStyles.css";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import '../authentication/LoginPage.css';
import TextareaAutosize from '@mui/material/TextareaAutosize';

function UserInformations() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        age: "",
        dob: "",
        country: "",
        city: "",
        address: "",
        addressProff: [],
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.form.users);
    const existingValues = selector.find((item) => item.id === id);

    function handlerSubmit(e) {
        e.preventDefault();

        if (id) {
            dispatch(updateUsers(form));
        } else {
            dispatch(addUsers({ ...form, id: uuid() }));
        }
        navigate("/userDetailsDisplay");
    }

    function handlerChanges(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function onFileChanges(e) {
        const file = e.target.files[0];
        if (file) {
            setForm({ ...form, addressProff: [...form.addressProff, file] });
        }
    }

    function onFileUpload(e) {
        e.preventDefault();
        if (form.addressProff.length > 0) {
            alert(`Uploaded files: ${form.addressProff.map((f) => f.name).join(", ")}`);
        } else {
            alert("No files selected..!!!");
        }
    }

    function deleteFile(index) {
        const updatedFiles = form.addressProff.filter((_, i) => i !== index);
        setForm({ ...form, addressProff: updatedFiles });
    }

    useEffect(() => {
        if (existingValues) {
            setForm(existingValues);
        }
    }, [existingValues]);

    return (
        <>
            <h1 className="headingSize">Personal Informations</h1>
            <div className="formPosition ">
                <form onSubmit={handlerSubmit}>
                    <FormControl  >
                        <InputLabel>Name:</InputLabel>
                        <Input type="text"
                            name="name" placeholder="Enter Your Name" value={form.name}
                            onChange={handlerChanges}
                        />
                    </FormControl> <br /> <br />

                    <FormControl  >
                        <InputLabel>Email:</InputLabel>
                        <Input type="email"
                            name="email" placeholder="Enter Your Email" value={form.email} onChange={handlerChanges}
                        />
                    </FormControl> <br /> <br />

                    <FormControl  >
                        <InputLabel>Age:</InputLabel>
                        <Input type="number"
                            name="age" placeholder="Enter Your Age" value={form.age}
                            onChange={handlerChanges}
                        />
                    </FormControl> <br /> <br />

                    <FormControl  >
                        <InputLabel>DOB:</InputLabel> &nbsp;
                        <Input type="date" name="dob" value={form.dob}
                            onChange={handlerChanges}
                        />
                    </FormControl> <br /> <br />

                    <div>
                        <CountryDropdown
                            value={form.country}
                            onChange={(val) => setForm({ ...form, country: val })}
                        />
                        <RegionDropdown
                            country={form.country}
                            value={form.city}
                            onChange={(val) => setForm({ ...form, city: val })}
                        />
                    </div> <br /> <br />

                    <FormControl  >
                        <TextareaAutosize name="address"
                            value={form.address} minRows={3} placeholder="Address"
                            onChange={handlerChanges}
                        />
                    </FormControl> <br /> <br />

                    <FormControl>
                        <Input type="file" onChange={onFileChanges} />
                        <Button variant="contained" color="primary" onClick={onFileUpload}>
                            Upload
                        </Button> <br /> <br />

                        {form.addressProff.length > 0 && (
                            <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                                {form.addressProff.map((file, index) => (
                                    <li key={index}>
                                        {file.name}{" "}
                                        <Button variant="outlined" color="secondary" size="small"
                                            onClick={() => deleteFile(index)}
                                        >
                                            Delete
                                        </Button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </FormControl> <br />

                    <Button type="submit" variant="contained" color="success">
                        Submit
                    </Button>
                </form>
            </div>
        </>
    );
}

export default UserInformations;
