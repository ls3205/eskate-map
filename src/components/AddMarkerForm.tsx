"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/Form";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/Select";
import { Session } from "next-auth";
import { useMutation } from "@tanstack/react-query";
import { AddMarker } from "@skatemap/app/actions";

export const formSchema = z.object({
    lat: z.number(),
    lng: z.number(),
    type: z.enum([
        "Single_Caution",
        "Double_Caution",
        "Triple_Caution",
        "Charge_Spot",
        "Meetup_Spot",
    ]),
    title: z
        .string()
        .max(50, "Title cannot be more than 50 characters")
        .min(1, "Title cannot be empty"),
    description: z
        .string()
        .max(250, "Description cannot be more than 250 characters")
        .min(1, "Description cannot be empty"),
});

interface AddMarkerFormProps {
    latLng: [lat: number, lng: number];
    session: Session;
    markerRef: any;
}

const AddMarkerForm: React.FC<AddMarkerFormProps> = ({
    latLng,
    session,
    markerRef,
}) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            lat: latLng[0],
            lng: latLng[1],
            type: undefined,
            title: "",
            description: "",
        },
    });

    const { mutate: createMarker } = useMutation({
        mutationKey: ["CreateMarker"],
        mutationFn: async (marker: z.infer<typeof formSchema>) => {
            const data = await AddMarker(marker, session.user.id);
            return data;
        },
        onError: (err) => {},
        onSuccess: (data) => {
            markerRef.closePopup();
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        createMarker(values);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="lat"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                                <Input {...field} disabled />
                            </FormControl>
                            <FormDescription>
                                The Marker's Latitude
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="lng"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                                <Input {...field} disabled />
                            </FormControl>
                            <FormDescription>
                                The Marker's Longitude
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue=""
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a type of marker" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className="z-610">
                                    <SelectItem value="Single_Caution">
                                        Single Caution
                                    </SelectItem>
                                    <SelectItem value="Double_Caution">
                                        Double Caution
                                    </SelectItem>
                                    <SelectItem value="Triple_Caution">
                                        Triple Caution
                                    </SelectItem>
                                    <SelectItem value="Charge_Spot">
                                        Charge Spot
                                    </SelectItem>
                                    <SelectItem value="Meetup_Spot">
                                        Meetup Spot
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                The Type of Marker
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                The Marker's Title
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                A Description of the Marker
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit Marker</Button>
            </form>
        </Form>
    );
};

export default AddMarkerForm;
