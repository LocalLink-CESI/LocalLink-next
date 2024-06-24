'use client';

import React, {useEffect, useState} from "react";
import CreateUser from "@/app/actions/users/create";
import GetCities from "@/app/actions/cities/get";

import {
    FormControl,
    FormLabel,
    Select,
    Input,
    Button
} from '@chakra-ui/react'

type Props = {
    error?: string;
    callbackUrl?: string;
}

interface FormData {
    firstName: string;
    lastName: string;
    password: string;
    bio: string;
    cityId: number;
    avatar: string;
    email: string;
}

interface City {
    id: bigint;
    name: string;
    zipCode: string;
}

const RegisterForm = (props: Props) => {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        password: "",
        bio: "",
        cityId: 0,
        avatar: "",
        email: ""
    });

    const [cities, setCities] = useState<{ id: number; name: string; }[]>([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const fetchedCities: City[] = await GetCities();
                // Convert bigint to number for city ids
                const convertedCities = fetchedCities.map(city => ({
                    id: Number(city.id),
                    name: city.name,
                }));
                setCities(convertedCities);
            } catch (error) {
                console.error("Error fetching cities:", error);
            }
        };

        fetchCities();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await CreateUser(formData);

            window.alert("User created successfully");
            window.location.href = "/auth/signin";
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} style={{display: "flex", flexDirection: "column", gap: "10px"}}>
            <FormControl isRequired display='flex' flexDirection='column' gap='10px'>
                <FormLabel>First name</FormLabel>
                <Input type='text' onChange={handleChange} name='firstName' />

                <FormLabel>Last name</FormLabel>
                <Input type='text' onChange={handleChange} name='lastName' />

                <FormLabel>Email</FormLabel>
                <Input type='email' onChange={handleChange} name='email' />

                <FormLabel>Password</FormLabel>
                <Input type='password' onChange={handleChange} name='password' />

                <FormLabel>Bio</FormLabel>
                <Input type='text' onChange={handleChange} name='bio' />

                <FormLabel>City</FormLabel>
                <Select onChange={handleChange} name='cityId'>
                    <option value="">Select a city</option>
                    {cities.map(city => (
                        <option key={city.id} value={city.id}>{city.name}</option>
                    ))}
                </Select>

                <FormLabel>Avatar</FormLabel>
                <Input type='text' onChange={handleChange} name='avatar' />

            </FormControl>

            <Button type='submit'>Submit</Button>

        </form>
    )
}

export default RegisterForm;