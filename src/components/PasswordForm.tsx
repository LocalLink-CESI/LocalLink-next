// 'use client';
//
// import React, {useState} from "react";
// import {CreatePassword} from "@/app/actions/users/create";
//
// import {
//     Box,
//     Button,
//     Container,
//     FormLabel,
//     Icon,
//     IconProps,
//     Input,
//     SimpleGrid,
//     Stack,
//     useBreakpointValue
// } from '@chakra-ui/react'
// import {brandPrimary} from '../../theme';
// import {useSession} from "next-auth/react";
//
// type Props = {
//     error?: string;
//     callbackUrl?: string;
// }
//
// interface FormData {
//     password: string;
// }
//
// export function PasswordForm() {
//     const [password, setPassword] = useState<string>("");
//
//     const session = useSession();
//
//     const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();
//         try {
//             await CreatePassword(session.data.session?.user.email, password);
//
//             window.alert("Mot de passe modifié avec succès");
//             window.location.href = "/";
//         } catch (error) {
//             console.error(error);
//         }
//     }
//
//     const labelStyle = {fontFamily: "Montserrat", fontWeight: 800, margin: 0}
//     return (
//         <Box position={'relative'}>
//             <Container
//                 as={SimpleGrid}
//                 maxW={'7xl'}
//                 columns={{base: 1, md: 2}}
//                 spacing={{base: 10, lg: 32}}
//                 py={{base: 10, sm: 20, lg: 32}}>
//                 <Stack
//                     bg={'gray.50'}
//                     rounded={'xl'}
//                     p={{base: 4, sm: 6, md: 8}}
//                     spacing={{base: 8}}
//                     maxW={{lg: 'lg'}}>
//
//                     <Box as={'form'} mt={0}>
//                         <Stack spacing={4}>
//                             <FormLabel style={labelStyle}>Mot de passe</FormLabel>
//                             <Input
//                                 placeholder="MonMotDePasse"
//                                 type="password"
//                                 name="password"
//                                 bg={'gray.100'}
//                                 min={8}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 border={0}
//                                 color={'gray.500'}
//                                 _placeholder={{
//                                     color: 'gray.500',
//                                 }}
//                             />
//                         </Stack>
//                         <Button
//                             onClick={handleSubmit}
//                             fontFamily={'heading'}
//                             mt={8}
//                             w={'full'}
//                             bg={brandPrimary}
//                             color={'white'}
//                             _hover={{
//                                 bgGradient: 'brandprimary.700',
//                                 boxShadow: 'xl',
//                             }}>
//                             Envoyer
//                         </Button>
//                     </Box>
//                     form
//                 </Stack>
//             </Container>
//         </Box>
//     )
// }
//
// export default PasswordForm;