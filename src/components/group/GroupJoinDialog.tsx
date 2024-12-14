// 'use client';
// import React, { useEffect, useState } from 'react';
// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
// import { useCurrentUser } from '@/lib/hooks';
// import { db } from '@/lib/db';
// import { useLiveQuery } from 'dexie-react-hooks';
// import { upsertChatJoinRequestList } from '@/lib/storage';
// import { postJoinRequests } from '@/lib/api';


// interface GroupJoinDialogProps {
//     chatId: string;
//     open: boolean;
//     onClose: () => void;
// }

// export default function GroupJoinDialog({ chatId, open, onClose }: GroupJoinDialogProps) {
//     const { currentUser } = useCurrentUser();
//     const chat = useLiveQuery(() => db.chats.where('chatId').equals(chatId).first(), [chatId]);

//     const handleJoin = async () => {
//         if (!currentUser.userId || !chat) return;
//         const chatJoinRequestId = chat.joinRequestListId;
//     }


//     return (
//         <Dialog
//             open={open}
//             onClose={onClose}
//         >
//             <DialogTitle>
//                 Join Group
//             </DialogTitle>
//             <DialogContent>
//                 <DialogContentText>
//                     {` Join group ${chat?.chatName || 'Group Name'}?`}
//                 </DialogContentText>
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={onClose}>Cancel</Button>
//                 <Button onClick={onClose}>Join</Button>
//             </DialogActions>
//         </Dialog>
//     );

// }