import { Input, FormControl, FormLabel, FormHelperText, Button, IconButton, Divider , Sheet, Alert} from "@mui/joy"
import Autocomplete from '@mui/joy/Autocomplete';
import { useEffect, useState } from "react";



import { MdContentPaste } from "react-icons/md";
import fetchData from "../../utils/fetchData";
import { useNavigate } from "react-router-dom";

const Create = () => {

    const navigate = useNavigate()

    const [longUrl, setLongUrl] = useState();
    const [title, setTitle] = useState();
    const [alias, setAlias] = useState();
    const [tag, setTag] = useState();
    const [tags, setTags] = useState([{title : ""}])

    const [selectedTags, setSelectedTags] = useState([]);

    const [addCatLoading, setAddCatLoading] = useState(false)
    const [addCatError, setAddCatError] = useState(null)

    const [addLinkLoading, setaddLinkLoading] = useState(false)

    const handleTagChange = (event, value) => {
        setSelectedTags(value); 
      };


    const handleAddTag = async () => {
        try {
            setAddCatError(null)
            setAddCatLoading(true);
            await fetchData('/link/categorie/create', {
                method : "POST",
                body : {
                    title : tag,
                }
            })
            setAddCatLoading(false)
        } catch (error) {
            setAddCatLoading(false)
            if (error.response.status == 401)
                setAddCatError(error.response?.data?.message)
            else setAddCatError("Erro, cant add it right now")
            setAddCatLoading(false)            
        }
    }

    const addLink = async () => {
        try {
            setaddLinkLoading(true)
            const link = await fetchData('/link/create', {
                method : "POST",
                body : {
                    title : title,
                    longUrl,
                    alias,
                    categories : [...selectedTags.map((e, i) => e.title)]
                }
            })
            setaddLinkLoading(false)
            navigate('/dashboard')
        } catch (error) {
            setaddLinkLoading(false)
            console.log(error);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const categories = await fetchData('/link/categorie/all', {body : {}});
                setTags(categories.data.cats);
            } catch (error) {
                console.log(error);
            }
          })();       
    }, [addCatLoading])

    return (
        <div className="p-8 max-w-2xl flex flex-col gap-4 mx-auto">
            <div className="">
                <span className="font-bold text-3xl">
                    Create new link
                </span>

            </div>
            <div
                variant="soft"
                color="neutral"
                className="flex flex-col gap-6 p-6 link-create rounded-md grow-1"
            >
                <FormControl>
                    <FormLabel>Destination</FormLabel>
                    <Input onChange={(e) => setLongUrl(e.target.value)} placeholder="Https://www.long.url/go?v=ikdhdihd&p=jdhgdvvv_7" endDecorator={
                        <IconButton><MdContentPaste />       </IconButton>
                    } />
                </FormControl>
                <FormControl>
                    <FormLabel>Title (optional)</FormLabel>
                    <Input onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                </FormControl>

                <FormControl>
                    <FormLabel>Alias (optional)</FormLabel>
                    <Input onChange={(e) => setAlias(e.target.value)} startDecorator={<span>42lin.ks/</span>} placeholder="Alias" />
                </FormControl>

                    {addCatError && <Alert color="danger"> {addCatError}</Alert>}
                <FormControl>   
                    <FormLabel>Create new tag</FormLabel>
                    <Input onChange={(e) => setTag(e.target.value)} placeholder="Tag" endDecorator={
                        <Button loading={addCatLoading} onClick={handleAddTag} className="grow-0">Add tag</Button>
                    } />
                </FormControl>


                <FormControl>
                    <FormLabel>Tags (optional)</FormLabel>
                    <Autocomplete
                        multiple
                        id="tags-default"
                        placeholder="Tags"
                        options={tags}
                        onChange={handleTagChange} // Handle selection changes
                        getOptionLabel={(option) => option.title}
                    />
                </FormControl>

                        <Divider></Divider>
                <Sheet className="flex gap-8 flex-wrap  w-full justify-end">
                    <Button variant="plain">Cancel</Button>
                    <Button loading={addLinkLoading} onClick={addLink}>Create</Button>

                </Sheet>
            </div>
        </div>
    )
}

export default Create