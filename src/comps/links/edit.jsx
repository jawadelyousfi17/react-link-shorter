import { Input, FormControl, FormLabel, FormHelperText, Button, IconButton, Divider , Sheet} from "@mui/joy"
import Autocomplete from '@mui/joy/Autocomplete';
import { useEffect } from "react";

import { MdContentPaste } from "react-icons/md";
import { useParams } from "react-router-dom";

const Edit = () => {
    const params = useParams()

    return (
        <div className="p-8 max-w-2xl flex flex-col gap-4 mx-auto">
            <div className="">
                <span className="font-bold text-3xl">
                    Edit a link
                </span>

            </div>
            <div
                variant="soft"
                color="neutral"
                className="flex flex-col gap-6 p-6 link-create rounded-md grow-1"
            >
                <FormControl>
                    <FormLabel>Destination</FormLabel>
                    <Input placeholder="Https://www.long.url/go?v=ikdhdihd&p=jdhgdvvv_7" endDecorator={
                        <IconButton><MdContentPaste />       </IconButton>
                    } />
                </FormControl>
                <FormControl>
                    <FormLabel>Title (optional)</FormLabel>
                    <Input placeholder="Title" />
                </FormControl>

                <FormControl>
                    <FormLabel>Alias (optional)</FormLabel>
                    <Input startDecorator={<span>42lin.ks/</span>} placeholder="Alias" />
                </FormControl>


                <FormControl>
                    <FormLabel>Create new tag</FormLabel>
                    <Input placeholder="Tag" endDecorator={
                        <Button className="grow-0">Add tag</Button>
                    } />
                </FormControl>


                <FormControl>
                    <FormLabel>Tags (optional)</FormLabel>
                    <Autocomplete
                        multiple
                        id="tags-default"
                        placeholder="Tags"
                        options={top100Films}
                        defaultValue={[top100Films[1], top100Films[2] ]}
                        getOptionLabel={(option) => option.title}
                    />
                </FormControl>

                        <Divider></Divider>
                <Sheet className="flex gap-8 flex-wrap  w-full justify-end">
                    <Button variant="plain">Cancel</Button>
                    <Button>Save</Button>

                </Sheet>
            </div>
        </div>
    )
}

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
    { title: 'The Dark Knight', year: 2008 },
    { title: 'Interstellar', year: 2014 }]

export default Edit