'use client'

import {
  Box,
  Container,
  Flex,
  Text,
  Button,
  Badge,
  Avatar,
  VStack,
  HStack,
  Separator,
  Card,


  Grid,
  GridItem,
  IconButton,

  Input,
  Textarea,
  Field,
  SimpleGrid,
  Progress
} from '@chakra-ui/react'
import { useState } from 'react'
import {
  FiUser,
  FiEdit3,
  FiSettings,
  FiHeart,
  FiBookmark,
  FiEye,
  FiTrendingUp,
  FiCalendar,
  FiMail,
  FiGlobe,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiPlus,
  FiTrash2,
  FiShare2
} from 'react-icons/fi'
import Navbar from '../../components/Navbar'
import { toaster } from '../../components/ui/toaster'

const userData = {
  id: '1',
  name: 'Alex Chen',
  email: 'alex.chen@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  bio: 'Senior Software Engineer with expertise in full-stack development and AI integration.',
  location: 'San Francisco, CA',
  website: 'https://alexchen.dev',
  github: 'alexchen',
  twitter: 'alexchen_dev',
  linkedin: 'alexchen',
  joinDate: '2023-06-15',
  stats: {
    prompts: 45,
    likes: 1250,
    bookmarks: 340,
    followers: 890,
    following: 234,
    views: 15420
  },
  level: 'Expert',
  experience: 8750,
  nextLevelExp: 10000
}

const userPrompts = [
  {
    id: '1',
    title: 'Advanced Code Review Assistant',
    category: 'Development',
    likes: 324,
    bookmarks: 156,
    views: 2847,
    createdAt: '2024-01-15',
    status: 'published'
  },
  {
    id: '2',
    title: 'Creative Writing Companion',
    category: 'Writing',
    likes: 189,
    bookmarks: 89,
    views: 1456,
    createdAt: '2024-01-10',
    status: 'published'
  },
  {
    id: '3',
    title: 'Data Analysis Helper',
    category: 'Analytics',
    likes: 267,
    bookmarks: 134,
    views: 1923,
    createdAt: '2024-01-08',
    status: 'draft'
  }
]

export default function UserCenterPage() {
  const [user, setUser] = useState(userData)
  const [isEditing, setIsEditing] = useState(false)


  const bgGradient = 'linear(to-br, gray.900, blue.900)'

  const handleEditProfile = () => {
    setIsEditing(!isEditing)
    if (isEditing) {
      toaster.create({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
        status: 'success',
        duration: 3000,
      })
    }
  }

  const handleDeletePrompt = (promptId: string) => {
    toast({
      title: 'Prompt deleted',
      description: 'The prompt has been successfully deleted.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Box minH="100vh" bg="gray.900">
      <Navbar />
      
      <Container maxW="7xl" py={8}>
        <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={8}>
          {/* Sidebar */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Profile Card */}
              <Card.Root className="glass-effect">
            <Card.Body>
                  <VStack spacing={4} align="center">
                    <Avatar
                      size="xl"
                      src={user.avatar}
                      name={user.name}
                    />
                    <VStack spacing={1} align="center">
                      <Text fontSize="xl" fontWeight="bold">{user.name}</Text>
                      <Text fontSize="sm" color="gray.400">{user.email}</Text>
                      <Badge colorScheme="blue" variant="subtle">
                        {user.level}
                      </Badge>
                    </VStack>
                    
                    <Text fontSize="sm" color="gray.300" textAlign="center">
                      {user.bio}
                    </Text>
                    
                    <Separator />
                    
                    <VStack spacing={2} align="stretch" w="full">
                      <HStack justify="space-between">
                        <HStack spacing={1}>
                          <FiCalendar size={14} />
                          <Text fontSize="sm">Joined</Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.400">{user.joinDate}</Text>
                      </HStack>
                      
                      <HStack justify="space-between">
                        <HStack spacing={1}>
                          <FiMail size={14} />
                          <Text fontSize="sm">Location</Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.400">{user.location}</Text>
                      </HStack>
                    </VStack>
                    
                    <Button
                      colorScheme="blue"
                      variant="outline"
                      size="sm"
                      w="full"
                      onClick={handleEditProfile}
                    >
                      <FiEdit3 />
                      {isEditing ? 'Save Profile' : 'Edit Profile'}
                    </Button>
                  </VStack>
                </Card.Body>
          </Card.Root>

              {/* Stats Card */}
              <Card.Root className="glass-effect">
                <Card.Header>
                  <Text fontSize="lg" fontWeight="bold">Statistics</Text>
                </Card.Header>
                <Card.Body>
                  <SimpleGrid columns={2} spacing={4}>
                    <VStack spacing={1} textAlign="center">
                      <Text fontSize="xl" fontWeight="bold">{user.stats.prompts}</Text>
                      <Text fontSize="sm" color="gray.400">Prompts</Text>
                    </VStack>
                    <VStack spacing={1} textAlign="center">
                      <Text fontSize="xl" fontWeight="bold">{user.stats.likes}</Text>
                      <Text fontSize="sm" color="gray.400">Likes</Text>
                    </VStack>
                    <VStack spacing={1} textAlign="center">
                      <Text fontSize="xl" fontWeight="bold">{user.stats.followers}</Text>
                      <Text fontSize="sm" color="gray.400">Followers</Text>
                    </VStack>
                    <VStack spacing={1} textAlign="center">
                      <Text fontSize="xl" fontWeight="bold">{user.stats.views.toLocaleString()}</Text>
                      <Text fontSize="sm" color="gray.400">Views</Text>
                    </VStack>
                  </SimpleGrid>
                </Card.Body>
              </Card.Root>
            </VStack>
          </GridItem>

          {/* Main Content */}
          <GridItem>
            <Card.Root className="glass-effect">
              <Card.Body>
                <VStack spacing={6} align="stretch">
                  <HStack justify="space-between">
                    <Text fontSize="xl" fontWeight="bold">My Prompts ({userPrompts.length})</Text>
                    <Button
                      colorScheme="blue"
                      className="hover-glow"
                    >
                      <FiPlus />
                      Create New
                    </Button>
                  </HStack>
                  
                  <VStack spacing={3} align="stretch">
                    {userPrompts.map((prompt) => (
                      <Card.Root key={prompt.id} bg="gray.800">
                        <Card.Body>
                          <HStack justify="space-between" align="start">
                            <VStack spacing={2} align="start" flex={1}>
                              <HStack spacing={2}>
                                <Text fontWeight="semibold">{prompt.title}</Text>
                                <Badge
                                  colorScheme={prompt.status === 'published' ? 'green' : 'yellow'}
                                  size="sm"
                                >
                                  {prompt.status}
                                </Badge>
                              </HStack>
                              <HStack spacing={4} fontSize="sm" color="gray.400">
                                <HStack spacing={1}>
                                  <FiHeart size={14} />
                                  <Text>{prompt.likes}</Text>
                                </HStack>
                                <HStack spacing={1}>
                                  <FiBookmark size={14} />
                                  <Text>{prompt.bookmarks}</Text>
                                </HStack>
                                <HStack spacing={1}>
                                  <FiEye size={14} />
                                  <Text>{prompt.views}</Text>
                                </HStack>
                                <Text>{prompt.createdAt}</Text>
                              </HStack>
                            </VStack>
                            <HStack spacing={1}>
                              <IconButton
                                aria-label="Edit"
                                icon={<FiEdit3 />}
                                size="sm"
                                variant="ghost"
                              />
                              <IconButton
                                aria-label="Share"
                                icon={<FiShare2 />}
                                size="sm"
                                variant="ghost"
                              />
                              <IconButton
                                aria-label="Delete"
                                icon={<FiTrash2 />}
                                size="sm"
                                variant="ghost"
                                colorScheme="red"
                                onClick={() => handleDeletePrompt(prompt.id)}
                              />
                            </HStack>
                          </HStack>
                        </Card.Body>
                      </Card.Root>
                    ))}
                  </VStack>
                </VStack>
              </Card.Body>
            </Card.Root>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  )
}