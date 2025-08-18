'use client'

import {
  Box,
  Container,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Card,

  Badge,
  Avatar,
  SimpleGrid,
  Select,
  Input,
  InputGroup,
  Icon,
  Flex,
  Menu,
  IconButton,
  Tabs,
  useDisclosure,
  Dialog,
  Textarea,
  Field,

  Portal,
} from '@chakra-ui/react';
import { FaFilter, FaSort, FaHeart, FaBookmark, FaShare, FaPlus, FaComment, FaChevronDown, FaClock, FaCaretUp, FaStar, FaEye, FaSearch } from 'react-icons/fa';
import NextLink from 'next/link';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import { toaster } from '@/components/ui/toaster';

// 模拟数据
const communityPrompts = [
  {
    id: '1',
    title: 'AI写作助手 - 创意文案生成器',
    description: '专门用于生成创意文案、广告语和营销内容的AI助手，支持多种风格和语调调整',
    content: '你是一个专业的创意文案写手，擅长创作吸引人的广告语和营销内容...',
    category: '写作',
    tags: ['写作', '创意', '营销', '文案'],
    author: {
      username: 'AI创作者',
      avatar: '',
      level: 'Pro',
    },
    likes: 1234,
    views: 5678,
    comments: 89,
    bookmarks: 456,
    aiModel: ['GPT-4', 'Claude'],
    createdAt: '2024-01-15',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    title: '代码审查专家 - 智能代码优化',
    description: '专业的代码审查和优化建议工具，支持多种编程语言，提供详细的改进建议',
    content: '你是一个资深的代码审查专家，精通多种编程语言和最佳实践...',
    category: '编程',
    tags: ['代码', '审查', '优化', '编程'],
    author: {
      username: '代码大师',
      avatar: '',
      level: 'Expert',
    },
    likes: 987,
    views: 3456,
    comments: 67,
    bookmarks: 234,
    aiModel: ['GPT-4', 'Copilot'],
    createdAt: '2024-01-14',
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: '3',
    title: '数据分析师 - 深度洞察报告',
    description: '专业的数据分析和可视化助手，能够从复杂数据中提取有价值的商业洞察',
    content: '你是一个专业的数据分析师，擅长从数据中发现模式和趋势...',
    category: '数据分析',
    tags: ['数据', '分析', '洞察', '可视化'],
    author: {
      username: '数据专家',
      avatar: '',
      level: 'Pro',
    },
    likes: 756,
    views: 2345,
    comments: 45,
    bookmarks: 189,
    aiModel: ['GPT-4', 'Claude'],
    createdAt: '2024-01-13',
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: '4',
    title: 'UI/UX设计顾问 - 用户体验优化',
    description: '专业的UI/UX设计建议和用户体验优化方案，帮助提升产品的可用性',
    content: '你是一个经验丰富的UI/UX设计师，专注于用户体验和界面设计...',
    category: '设计',
    tags: ['设计', 'UI', 'UX', '用户体验'],
    author: {
      username: '设计师小王',
      avatar: '',
      level: 'Advanced',
    },
    likes: 543,
    views: 1876,
    comments: 32,
    bookmarks: 145,
    aiModel: ['GPT-4', 'Midjourney'],
    createdAt: '2024-01-12',
    isLiked: false,
    isBookmarked: false,
  },
];

const categories = ['全部', '写作', '编程', '数据分析', '设计', '营销', '教育', '其他'];
const sortOptions = [
  { value: 'latest', label: '最新发布' },
  { value: 'popular', label: '最受欢迎' },
  { value: 'mostLiked', label: '最多点赞' },
  { value: 'mostViewed', label: '最多浏览' },
];

export default function CommunityPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [sortBy, setSortBy] = useState('latest');
  const [prompts, setPrompts] = useState(communityPrompts);
  const { isOpen, onOpen, onClose } = useDisclosure();


  const [newPrompt, setNewPrompt] = useState({
    title: '',
    description: '',
    content: '',
    category: '写作',
    tags: '',
    aiModel: 'GPT-4',
  });

  const handleLike = (promptId: string) => {
    setPrompts(prev => prev.map(prompt => {
      if (prompt.id === promptId) {
        return {
          ...prompt,
          isLiked: !prompt.isLiked,
          likes: prompt.isLiked ? prompt.likes - 1 : prompt.likes + 1,
        };
      }
      return prompt;
    }));
  };

  const handleBookmark = (promptId: string) => {
    setPrompts(prev => prev.map(prompt => {
      if (prompt.id === promptId) {
        return {
          ...prompt,
          isBookmarked: !prompt.isBookmarked,
          bookmarks: prompt.isBookmarked ? prompt.bookmarks - 1 : prompt.bookmarks + 1,
        };
      }
      return prompt;
    }));
  };

  const handleShare = (prompt: any) => {
    if (navigator.share) {
      navigator.share({
        title: prompt.title,
        text: prompt.description,
        url: window.location.href + '/' + prompt.id,
      });
    } else {
      navigator.clipboard.writeText(window.location.href + '/' + prompt.id);
      toaster.create({
        title: '链接已复制',
        description: 'Prompt链接已复制到剪贴板',
        status: 'success',
        duration: 2000,
      });
    }
  };

  const handleSubmitPrompt = () => {
    if (!newPrompt.title || !newPrompt.content) {
      toast({
        title: '请填写必要信息',
        description: '标题和内容是必填项',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // TODO: 实现提交逻辑
    console.log('New prompt:', newPrompt);
    toast({
      title: 'Prompt提交成功',
      description: '您的Prompt已提交，等待审核',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    onClose();
    setNewPrompt({
      title: '',
      description: '',
      content: '',
      category: '写作',
      tags: '',
      aiModel: 'GPT-4',
    });
  };

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         prompt.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === '全部' || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedPrompts = [...filteredPrompts].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.likes + b.views + b.comments) - (a.likes + a.views + a.comments);
      case 'mostLiked':
        return b.likes - a.likes;
      case 'mostViewed':
        return b.views - a.views;
      case 'latest':
      default:
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  });

  return (
    <Box minH="100vh">
      <Navbar />
      
      <Container maxW="1200px" pt={{ base: '100px', md: '120px' }} pb={8}>
        <VStack spacing={8} align="stretch">
          {/* 页面标题和操作 */}
          <Flex justify="space-between" align="center" flexWrap="wrap" gap={4}>
            <VStack align="start" spacing={2}>
              <Heading className="gradient-text" size="xl">
                社区广场
              </Heading>
              <Text color="gray.400">
                发现和分享优质的AI Prompt，与社区成员交流经验
              </Text>
            </VStack>
            <Button
              bg="linear-gradient(45deg, #00ffff, #ff00ff)"
              color="black"
              fontWeight="bold"
              onClick={onOpen}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 255, 255, 0.3)',
              }}
            >
              <Icon as={FaPlus} />
              分享Prompt
            </Button>
          </Flex>

          {/* 搜索和筛选 */}
          <Card.Root className="glass-effect">
              <Card.Body p={6}>
              <VStack spacing={4}>
                {/* 搜索框 */}
                <InputGroup size="lg" startElement={<FaSearch color="gray.400" />}>
                  <Input
                    placeholder="搜索Prompt、标签或作者..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    bg="rgba(255, 255, 255, 0.05)"
                    border="1px solid"
                    borderColor="rgba(0, 255, 255, 0.3)"
                    _hover={{
                      borderColor: 'brand.500',
                      boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)',
                    }}
                    _focus={{
                      borderColor: 'brand.500',
                      boxShadow: '0 0 15px rgba(0, 255, 255, 0.4)',
                    }}
                    color="white"
                    _placeholder={{ color: 'gray.400' }}
                  />
                </InputGroup>

                {/* 分类和排序 */}
                <Flex w="100%" gap={4} flexWrap="wrap">
                  <Tabs.Root
                  variant="subtle"
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                  flex={1}
                >
                    <Tabs.List flexWrap="wrap">
                      {categories.map((category) => (
                        <Tabs.Trigger
                          key={category}
                          value={category}
                          _selected={{
                            bg: 'rgba(0, 255, 255, 0.2)',
                            color: 'brand.500',
                          }}
                          fontSize="sm"
                        >
                          {category}
                        </Tabs.Trigger>
                      ))}
                    </Tabs.List>
                  </Tabs.Root>

                  <Menu.Root>
                    <Menu.Trigger asChild>
                      <Button
                        rightIcon={<FaChevronDown />}
                        variant="outline"
                        size="sm"
                        minW="120px"
                      >
                        <HStack spacing={2}>
                          <FaSort />
                          <Text>{sortOptions.find(opt => opt.value === sortBy)?.label}</Text>
                        </HStack>
                      </Button>
                    </Menu.Trigger>
                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content bg="gray.800" borderColor="gray.600">
                          {sortOptions.map((option) => (
                            <Menu.Item
                              key={option.value}
                              onClick={() => setSortBy(option.value)}
                              bg={sortBy === option.value ? 'rgba(0, 255, 255, 0.1)' : 'transparent'}
                              _hover={{ bg: 'rgba(0, 255, 255, 0.1)' }}
                            >
                              {option.label}
                            </Menu.Item>
                          ))}
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
                </Flex>
              </VStack>
            </Card.Body>
            </Card.Root>

          {/* Prompt列表 */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
            {sortedPrompts.map((prompt) => (
              <Card.Root
                key={prompt.id}
                className="glass-effect hover-glow"
                cursor="pointer"
                transition="all 0.3s ease"
                _hover={{
                  transform: 'translateY(-5px)',
                  boxShadow: '0 15px 40px rgba(0, 255, 255, 0.2)',
                }}
              >
                <Card.Body p={6}>
                  <VStack align="stretch" spacing={4}>
                    {/* 头部信息 */}
                    <Flex justify="space-between" align="start">
                      <HStack spacing={3}>
                        <Avatar size="sm" name={prompt.author.username} />
                        <VStack align="start" spacing={0}>
                          <HStack spacing={2}>
                            <Text fontSize="sm" color="white" fontWeight="medium">
                              {prompt.author.username}
                            </Text>
                            <Badge
                              size="sm"
                              bg="rgba(255, 0, 255, 0.2)"
                              color="accent.500"
                            >
                              {prompt.author.level}
                            </Badge>
                          </HStack>
                          <Text fontSize="xs" color="gray.500">
                            {prompt.createdAt}
                          </Text>
                        </VStack>
                      </HStack>
                      <Badge
                        colorScheme="cyan"
                        variant="subtle"
                        bg="rgba(0, 255, 255, 0.2)"
                        color="brand.500"
                      >
                        {prompt.category}
                      </Badge>
                    </Flex>

                    {/* 标题和描述 */}
                    <VStack align="stretch" spacing={2}>
                      <Heading as="h3" size="md" color="white" noOfLines={2}>
                        {prompt.title}
                      </Heading>
                      <Text color="gray.300" fontSize="sm" noOfLines={3}>
                        {prompt.description}
                      </Text>
                    </VStack>

                    {/* 标签 */}
                    <HStack spacing={2} flexWrap="wrap">
                      {prompt.tags.map((tag) => (
                        <Badge
                          key={tag}
                          size="sm"
                          variant="outline"
                          borderColor="gray.600"
                          color="gray.400"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </HStack>

                    {/* AI模型 */}
                    <HStack spacing={2}>
                      <Text fontSize="xs" color="gray.500">
                        支持模型:
                      </Text>
                      {prompt.aiModel.map((model) => (
                        <Badge
                          key={model}
                          size="sm"
                          bg="rgba(255, 255, 0, 0.2)"
                          color="yellow.400"
                        >
                          {model}
                        </Badge>
                      ))}
                    </HStack>

                    {/* 互动按钮 */}
                    <Flex justify="space-between" align="center" pt={2}>
                      <HStack spacing={4} fontSize="sm" color="gray.400">
                        <HStack spacing={1}>
                          <FaEye />
                          <Text>{prompt.views}</Text>
                        </HStack>
                        <HStack spacing={1}>
                          <FaComment />
                          <Text>{prompt.comments}</Text>
                        </HStack>
                      </HStack>

                      <HStack spacing={2}>
                        <IconButton
                          aria-label="点赞"
                          icon={<FaHeart />}
                          size="sm"
                          variant="ghost"
                          color={prompt.isLiked ? 'red.400' : 'gray.400'}
                          _hover={{
                            color: 'red.400',
                            transform: 'scale(1.1)',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(prompt.id);
                          }}
                        />
                        <Text fontSize="sm" color="gray.400">
                          {prompt.likes}
                        </Text>

                        <IconButton
                          aria-label="收藏"
                          icon={<FaBookmark />}
                          size="sm"
                          variant="ghost"
                          color={prompt.isBookmarked ? 'yellow.400' : 'gray.400'}
                          _hover={{
                            color: 'yellow.400',
                            transform: 'scale(1.1)',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBookmark(prompt.id);
                          }}
                        />

                        <IconButton
                          aria-label="分享"
                          icon={<FaShare />}
                          size="sm"
                          variant="ghost"
                          color="gray.400"
                          _hover={{
                            color: 'brand.500',
                            transform: 'scale(1.1)',
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShare(prompt);
                          }}
                        />
                      </HStack>
                    </Flex>
                  </VStack>
                </Card.Body>
              </Card.Root>
            ))}
          </SimpleGrid>

          {/* 加载更多 */}
          <Flex justify="center" pt={8}>
            <Button
              variant="outline"
              size="lg"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0, 255, 255, 0.2)',
              }}
            >
              加载更多
            </Button>
          </Flex>
        </VStack>
      </Container>

      {/* 分享Prompt模态框 */}
      <Dialog.Root open={isOpen} onOpenChange={(e) => !e.open && onClose()} size="xl">
        <Portal>
          <Dialog.Backdrop bg="blackAlpha.800" />
          <Dialog.Positioner>
          <Dialog.Content bg="gray.800" borderColor="gray.600">
            <Dialog.Header>
              <Dialog.Title className="gradient-text">分享新的Prompt</Dialog.Title>
            </Dialog.Header>
            <Dialog.CloseTrigger color="gray.400" />
            <Dialog.Body>
            <VStack spacing={4}>
              <Field.Root required>
                <Field.Label color="gray.300">标题</Field.Label>
                <Input
                  placeholder="为您的Prompt起个吸引人的标题"
                  value={newPrompt.title}
                  onChange={(e) => setNewPrompt({ ...newPrompt, title: e.target.value })}
                  bg="rgba(255, 255, 255, 0.05)"
                  borderColor="gray.600"
                  _hover={{ borderColor: 'brand.500' }}
                  _focus={{ borderColor: 'brand.500', boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)' }}
                  color="white"
                />
              </Field.Root>

              <Field.Root>
                <Field.Label color="gray.300">描述</Field.Label>
                <Textarea
                  placeholder="简要描述这个Prompt的用途和特点"
                  value={newPrompt.description}
                  onChange={(e) => setNewPrompt({ ...newPrompt, description: e.target.value })}
                  bg="rgba(255, 255, 255, 0.05)"
                  borderColor="gray.600"
                  _hover={{ borderColor: 'brand.500' }}
                  _focus={{ borderColor: 'brand.500', boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)' }}
                  color="white"
                  rows={3}
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label color="gray.300">Prompt内容</Field.Label>
                <Textarea
                  placeholder="请输入完整的Prompt内容"
                  value={newPrompt.content}
                  onChange={(e) => setNewPrompt({ ...newPrompt, content: e.target.value })}
                  bg="rgba(255, 255, 255, 0.05)"
                  borderColor="gray.600"
                  _hover={{ borderColor: 'brand.500' }}
                  _focus={{ borderColor: 'brand.500', boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)' }}
                  color="white"
                  rows={6}
                />
              </Field.Root>

              <HStack w="100%" spacing={4}>
                <Field.Root>
                  <Field.Label color="gray.300">分类</Field.Label>
                  <Select
                    value={newPrompt.category}
                    onChange={(e) => setNewPrompt({ ...newPrompt, category: e.target.value })}
                    bg="rgba(255, 255, 255, 0.05)"
                    borderColor="gray.600"
                    color="white"
                  >
                    {categories.slice(1).map((category) => (
                      <option key={category} value={category} style={{ background: '#2D3748' }}>
                        {category}
                      </option>
                    ))}
                  </Select>
                </Field.Root>

                <Field.Root>
                  <Field.Label color="gray.300">AI模型</Field.Label>
                  <Select
                    value={newPrompt.aiModel}
                    onChange={(e) => setNewPrompt({ ...newPrompt, aiModel: e.target.value })}
                    bg="rgba(255, 255, 255, 0.05)"
                    borderColor="gray.600"
                    color="white"
                  >
                    <option value="GPT-4" style={{ background: '#2D3748' }}>GPT-4</option>
                    <option value="Claude" style={{ background: '#2D3748' }}>Claude</option>
                    <option value="Gemini" style={{ background: '#2D3748' }}>Gemini</option>
                    <option value="通用" style={{ background: '#2D3748' }}>通用</option>
                  </Select>
                </Field.Root>
              </HStack>

              <Field.Root>
                <Field.Label color="gray.300">标签</Field.Label>
                <Input
                  placeholder="用逗号分隔多个标签，如：写作,创意,营销"
                  value={newPrompt.tags}
                  onChange={(e) => setNewPrompt({ ...newPrompt, tags: e.target.value })}
                  bg="rgba(255, 255, 255, 0.05)"
                  borderColor="gray.600"
                  _hover={{ borderColor: 'brand.500' }}
                  _focus={{ borderColor: 'brand.500', boxShadow: '0 0 10px rgba(0, 255, 255, 0.3)' }}
                  color="white"
                />
              </Field.Root>
            </VStack>
            </Dialog.Body>

            <Dialog.Footer>
              <Button variant="ghost" mr={3} onClick={onClose}>
                取消
              </Button>
              <Button 
                bg="linear-gradient(45deg, #00ffff, #ff00ff)"
                color="black"
                fontWeight="bold"
                onClick={handleSubmitPrompt}
              >
                提交分享
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </Box>
  );
}