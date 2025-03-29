import { Inngest } from "inngest";
import connectdb from "./Db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart" });

export const syncusercreation = inngest.createFunction(
    {
        id: 'sync-user-from-clerk'
    },
    {
        event: 'clerk/user.created'
    },
    async ({event}) => {
        const { id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name + ' ' + last_name,
            imageUrl:image_url
        }
        await connectdb()
        await User.create(userData)
    }
)

export const syncuserupdation = inngest.createFunction(
    {
        id: 'update-user-from-clerk'
    },
    {
        event: 'clerk/user.updated'
    },
    async ({event}) => {
        const { id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id:id,
            email:email_addresses[0].email_address,
            name:first_name + ' ' + last_name,
            imageUrl:image_url
        }
        await connectdb()
        await User.findByIdAndUpdate(id,userData)
    }
)

export const syncuserdeletion = inngest.createFunction(
    {
        id: 'delete-user-from-clerk'
    },
    {
        event: 'clerk/user.deleted'
    },
    async ({event}) => {
        const { id } = event.data
        
        await connectdb()
        await User.findByIdAndDelete(id)
    }
)
