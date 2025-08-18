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
  Textarea,
  Card,


  Grid,
  GridItem,
  IconButton,
  useDisclosure,
  Dialog,
  Portal,

  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,

} from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { FiHeart, FiBookmark, FiShare2, FiCopy, FiThumbsUp, FiMessageCircle, FiEye, FiCalendar, FiUser, FiTag } from 'react-icons/fi'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa'
import Navbar from '../../components/Navbar'
import { toaster } from '../../components/ui/toaster'

// 模拟数据
const promptData = {
  id: '1',
  title: 'Advanced Code Review Assistant',
  description: 'A comprehensive prompt for conducting thorough code reviews with focus on best practices, security, and performance optimization.',
  content: `You are an expert code reviewer with 10+ years of experience in software development. Your task is to review the provided code and give constructive feedback.

Please analyze the code for:
1. Code quality and readability
2. Performance optimization opportunities
3. Security vulnerabilities
4. Best practices adherence
5. Potential bugs or edge cases

Provide specific suggestions for improvement with examples where applicable. Be constructive and educational in your feedback.

Code to review:
[INSERT CODE HERE]`,
  category: 'Development',
  tags: ['Code Review', 'Programming', 'Best Practices', 'Security'],
  author: {
    id: '1',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
    bio: 'Senior Software Engineer with expertise in full-stack development and AI integration.',
    followers: 1250,
    prompts: 45
  },
  stats: {
    likes: 324,
    bookmarks: 156,
    views: 2847,
    comments: 23
  },
  createdAt: '2024-01-15',
  updatedAt: '2024-01-20',
  isLiked: false,
  isBookmarked: false
}

const comments = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150'
    },
    content: 'This is an excellent prompt! I\'ve been using it for my team\'s code reviews and it has significantly improved our code quality.',
    createdAt: '2024-01-18',
    likes: 12
  },
  {
    id: '2',
    user: {
      name: 'Mike Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
    },
    content: 'Great structure! Could you add a section about accessibility best practices as well?',
    createdAt: '2024-01-19',
    likes: 8
  }
]

const relatedPrompts = [
  {
    id: '2',
    title: 'API Documentation Generator',
    category: 'Development',
    likes: 189,
    author: 'Emma Wilson'
  },
  {
    id: '3',
    title: 'Bug Report Analyzer',
    category: 'Development',
    likes: 267,
    author: 'David Kim'
  },
  {
    id: '4',
    title: 'Performance Optimization Guide',
    category: 'Development',
    likes: 145,
    author: 'Lisa Zhang'
  }
]

export default function DetailPage() {
  const [prompt, setPrompt] = useState(promptData)
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgGradient = 'linear(to-br, gray.900, blue.900)'

  const handleLike = () => {
    setPrompt(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      stats: {
        ...prev.stats,
        likes: prev.isLiked ? prev.stats.likes - 1 : prev.stats.likes + 1
      }
    }))
    toaster.create({
      title: prompt.isLiked ? 'Removed from likes' : 'Added to likes',
      status: 'success',
      duration: 2000
    })
  }

  const handleBookmark = () => {
    setPrompt(prev => ({
      ...prev,
      isBookmarked: !prev.isBookmarked,
      stats: {
        ...prev.stats,
        bookmarks: prev.isBookmarked ? prev.stats.bookmarks - 1 : prev.stats.bookmarks + 1
      }
    }))
    toaster.create({
      title: prompt.isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks',
      status: 'success',
      duration: 2000
    })
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content)
    toaster.create({
      title: 'Prompt copied to clipboard',
      status: 'success',
      duration: 2000
    })
  }

  const handleShare = () => {
    onOpen()
  }

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return
    
    setIsSubmitting(true)
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setNewComment('')
    setIsSubmitting(false)
    toaster.create({
      title: 'Comment posted successfully',
      status: 'success',
      duration: 2000
    })
  }

  return (
    <Box minH="100vh" bg={bgGradient}>
      <Navbar />
      
      <Container maxW="7xl" py={8}>
        <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
          {/* Main Content */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Header */}
              <Card.Root className="glass-effect">
            <Card.Body>
                  <VStack spacing={4} align="stretch">
                    <HStack justify="space-between" wrap="wrap">
                      <Badge colorScheme="blue" size="lg">
                        {prompt.category}
                      </Badge>
                      <HStack spacing={2}>
                        <IconButton
                          aria-label="Like"
                          icon={<FiHeart />}
                          colorScheme={prompt.isLiked ? 'red' : 'gray'}
                          variant={prompt.isLiked ? 'solid' : 'outline'}
                          onClick={handleLike}
                          className="hover-glow"
                        />
                        <IconButton
                          aria-label="Bookmark"
                          icon={<FiBookmark />}
                          colorScheme={prompt.isBookmarked ? 'yellow' : 'gray'}
                          variant={prompt.isBookmarked ? 'solid' : 'outline'}
                          onClick={handleBookmark}
                          className="hover-glow"
                        />
                        <IconButton
                          aria-label="Copy"
                          icon={<FiCopy />}
                          colorScheme="green"
                          variant="outline"
                          onClick={handleCopy}
                          className="hover-glow"
                        />
                        <IconButton
                          aria-label="Share"
                          icon={<FiShare2 />}
                          colorScheme="blue"
                          variant="outline"
                          onClick={handleShare}
                          className="hover-glow"
                        />
                      </HStack>
                    </HStack>
                    
                    <Text fontSize="3xl" fontWeight="bold" className="gradient-text">
                      {prompt.title}
                    </Text>
                    
                    <Text fontSize="lg" color="gray.300">
                      {prompt.description}
                    </Text>
                    
                    <HStack spacing={4} flexWrap="wrap">
                      {prompt.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" colorScheme="cyan">
                          <HStack spacing={1}>
                            <FiTag size={12} />
                            <Text>{tag}</Text>
                          </HStack>
                        </Badge>
                      ))}
                    </HStack>
                    
                    <HStack spacing={6} color="gray.400" fontSize="sm">
                      <HStack spacing={1}>
                        <FiEye />
                        <Text>{prompt.stats.views.toLocaleString()} views</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <FiHeart />
                        <Text>{prompt.stats.likes} likes</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <FiBookmark />
                        <Text>{prompt.stats.bookmarks} bookmarks</Text>
                      </HStack>
                      <HStack spacing={1}>
                        <FiCalendar />
                        <Text>Updated {prompt.updatedAt}</Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </Card.Body>
          </Card.Root>
              
              {/* Prompt Content */}
              <Card.Root className="glass-effect">
                <Card.Header>
                  <Text fontSize="xl" fontWeight="bold">Prompt Content</Text>
                </Card.Header>
                <Card.Body>
                  <Box
                    p={4}
                    bg="gray.800"
                    borderRadius="md"
                    border="1px solid"
                    borderColor="gray.600"
                    fontFamily="mono"
                    fontSize="sm"
                    whiteSpace="pre-wrap"
                    maxH="400px"
                    overflowY="auto"
                    className="custom-scrollbar"
                  >
                    {prompt.content}
                  </Box>
                </Card.Body>
              </Card.Root>
              
              {/* Comments Section */}
              <Card.Root className="glass-effect">
                <Card.Header>
                  <Text fontSize="xl" fontWeight="bold">
                    Comments ({prompt.stats.comments})
                  </Text>
                </Card.Header>
                <Card.Body>
                  <VStack spacing={4} align="stretch">
                    {/* Add Comment */}
                    <Box>
                      <Textarea
                        placeholder="Share your thoughts about this prompt..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        bg="gray.800"
                        border="1px solid"
                        borderColor="gray.600"
                        _focus={{ borderColor: 'blue.400' }}
                        resize="vertical"
                        minH="100px"
                      />
                      <HStack justify="flex-end" mt={2}>
                        <Button
                          colorScheme="blue"
                          onClick={handleCommentSubmit}
                          isLoading={isSubmitting}
                          loadingText="Posting..."
                          className="hover-glow"
                        >
                          Post Comment
                        </Button>
                      </HStack>
                    </Box>
                    
                    <Separator />
                    
                    {/* Comments List */}
                    <VStack spacing={4} align="stretch">
                      {comments.map((comment) => (
                        <Box key={comment.id} p={4} bg="gray.800" borderRadius="md">
                          <HStack spacing={3} align="start">
                            <Avatar size="sm" src={comment.user.avatar} />
                            <VStack spacing={2} align="stretch" flex={1}>
                              <HStack justify="space-between">
                                <Text fontWeight="semibold">{comment.user.name}</Text>
                                <Text fontSize="sm" color="gray.400">{comment.createdAt}</Text>
                              </HStack>
                              <Text color="gray.300">{comment.content}</Text>
                              <HStack spacing={2}>
                                <Button size="sm" variant="ghost">
                                  <FiThumbsUp />
                                  {comment.likes}
                                </Button>
                                <Button size="sm" variant="ghost">
                                  <FiMessageCircle />
                                  Reply
                                </Button>
                              </HStack>
                            </VStack>
                          </HStack>
                        </Box>
                      ))}
                    </VStack>
                  </VStack>
                </Card.Body>
              </Card.Root>
            </VStack>
          </GridItem>
          
          {/* Sidebar */}
          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Author Info */}
              <Card.Root className="glass-effect">
                <Card.Header>
                  <Text fontSize="lg" fontWeight="bold">Author</Text>
                </Card.Header>
                <Card.Body>
                  <VStack spacing={4}>
                    <Avatar size="xl" src={prompt.author.avatar} />
                    <VStack spacing={1}>
                      <Text fontSize="lg" fontWeight="semibold">{prompt.author.name}</Text>
                      <Text fontSize="sm" color="gray.400" textAlign="center">
                        {prompt.author.bio}
                      </Text>
                    </VStack>
                    
                    <HStack spacing={4}>
                      <Stat textAlign="center">
                        <StatNumber fontSize="lg">{prompt.author.followers}</StatNumber>
                        <StatLabel fontSize="xs">Followers</StatLabel>
                      </Stat>
                      <Stat textAlign="center">
                        <StatNumber fontSize="lg">{prompt.author.prompts}</StatNumber>
                        <StatLabel fontSize="xs">Prompts</StatLabel>
                      </Stat>
                    </HStack>
                    
                    <Button colorScheme="blue" size="sm" className="hover-glow">
                      Follow
                    </Button>
                  </VStack>
                </Card.Body>
              </Card.Root>
              
              {/* Related Prompts */}
              <Card.Root className="glass-effect">
                <Card.Header>
                  <Text fontSize="lg" fontWeight="bold">Related Prompts</Text>
                </Card.Header>
                <Card.Body>
                  <VStack spacing={3} align="stretch">
                    {relatedPrompts.map((related) => (
                      <Box
                        key={related.id}
                        p={3}
                        bg="gray.800"
                        borderRadius="md"
                        cursor="pointer"
                        _hover={{ bg: 'gray.700' }}
                        transition="all 0.2s"
                      >
                        <VStack spacing={2} align="stretch">
                          <Text fontWeight="semibold" fontSize="sm">
                            {related.title}
                          </Text>
                          <HStack justify="space-between">
                            <Badge size="sm" colorScheme="blue">
                              {related.category}
                            </Badge>
                            <HStack spacing={1} fontSize="xs" color="gray.400">
                              <FiHeart size={12} />
                              <Text>{related.likes}</Text>
                            </HStack>
                          </HStack>
                          <Text fontSize="xs" color="gray.500">
                            by {related.author}
                          </Text>
                        </VStack>
                       </Box>
                     ))}
                   </VStack>
                </Card.Body>
              </Card.Root>
            </VStack>
          </GridItem>
        </Grid>
      </Container>
      
      {/* Share Modal */}
      <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
          <Dialog.Content bg="gray.800" border="1px solid" borderColor="gray.600">
            <Dialog.Header>
              <Dialog.Title>Share this Prompt</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger />
            <Dialog.Body pb={6}>
            <VStack spacing={4}>
              <Text color="gray.300">Share this amazing prompt with others:</Text>
              
              <HStack spacing={4}>
                <IconButton
                  aria-label="Share on Twitter"
                  icon={<FaTwitter />}
                  colorScheme="twitter"
                  size="lg"
                  className="hover-glow"
                />
                <IconButton
                  aria-label="Share on LinkedIn"
                  icon={<FaLinkedin />}
                  colorScheme="linkedin"
                  size="lg"
                  className="hover-glow"
                />
                <IconButton
                  aria-label="Share on GitHub"
                  icon={<FaGithub />}
                  colorScheme="gray"
                  size="lg"
                  className="hover-glow"
                />
              </HStack>
              
              <Box w="full">
                <Text fontSize="sm" color="gray.400" mb={2}>Or copy link:</Text>
                <HStack>
                  <Box
                    flex={1}
                    p={2}
                    bg="gray.700"
                    borderRadius="md"
                    fontSize="sm"
                    fontFamily="mono"
                  >
                    https://promptgallery.com/prompt/{prompt.id}
                  </Box>
                  <IconButton
                    aria-label="Copy link"
                    icon={<FiCopy />}
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(`https://promptgallery.com/prompt/${prompt.id}`)
                      toaster.create({
                        title: 'Link copied to clipboard',
                        status: 'success',
                        duration: 2000
                      })
                    }}
                  />
                </HStack>
              </Box>
            </VStack>
            </Dialog.Body>
          </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  )
}