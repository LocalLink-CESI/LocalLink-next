'use client';

import {useEffect, useState} from "react";
import CreateUser from "@/app/actions/users/create";
import GetCities from "@/app/actions/cities/get";

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

export default function RegisterForm() {
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
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange}
                   placeholder="First Name"/>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange}
                   placeholder="Last Name"/>
            <input type="password" name="password" value={formData.password} onChange={handleChange}
                   placeholder="Password"/>
            <input type="text" name="bio" value={formData.bio} onChange={handleChange} placeholder="Bio"/>
            <select
                name="cityId" value={formData.cityId} onChange={handleChange}>
                <option value="">Select a city</option>
                {cities.map(city => (
                    <option key={city.id} value={city.id}>{city.name}</option>
                ))}
            </select>
            <input type="text" name="avatar" value={formData.avatar} onChange={handleChange} placeholder="Avatar"/>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email"/>
            <button type="submit">Submit</button>
        </form>
    )
}