import React from 'react'
import { LogOut, X } from "lucide-react"
function Sidebar() {
    return (
        <>
            <div className='h-full flex flex-col bg-[#232327]'>
                {/* Header */}
                <div className='p-4 border-b border-gray-700 flex item-center justify-between'>
                    <div className=' text-xl font-bold text-white'>helpBuddy</div>
                    <button ><X className='text-gray-300 w-6 h-6 ' /></button>
                </div>

                {/* History */}
                <div className=" flex-1 overflow-y-auto px-4 py-3 space-y-2">
                    <button className=" w-full bg-cyan-800 hover:bg-cyan-500 text-white px-4 py-2 rounded-xl mb-2">
                        + New Chat
                    </button>
                    <div className=" text-gray-500 text-sm mt-10 text-center">
                        No chat history yet
                    </div>
                </div>


                {/* Footer */}
                <div className="p-4 border-t border-gray-700">
                    <div className="flex flex-col gap-3">
                        <div className="flex item-center gap-2 cursor-pointer">
                            <img src=" rounded-full h-8 w-8 " alt="" />
                            <span className='text-gray-300'>
                                My Profile

                            </span>

                        </div>
                        <button className=' flex item-center gap-2 text-white px-4 py-2 rounded-lg hover:bg-gray-700 duration-300 transition'>< LogOut className='' />Logout</button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Sidebar;