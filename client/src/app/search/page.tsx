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
  Input,
  InputGroup,
  Flex,
  Checkbox,
  CheckboxGroup,
  Select,
  IconButton,
  useDisclosure,
  CloseButton,
  Separator,
  Stack,
  Tag,
  Spinner,
  Alert,
} from '@chakra-ui/react';
import { FiSearch, FiStar, FiEye, FiMessageCircle, FiClock, FiMenu, FiX, FiChevronDown, FiInfo } from 'react-icons/fi';
import { FaFilter, FaSort, FaHeart, FaBookmark, FaShare } from 'react-icons/fa';
import NextLink from 'next/link';
import { useState, useEffect } from 'react';
import { useDebounceSearch } from '@/hooks';
import Navbar from '@/components/Navbar';

// 模拟搜索结果数据
const searchResults = [
  {
    id: '1',
    title: 'AI写作助手 - 创意文案生成器',
    description: '专门用于生成创意文案、广告语和营销内容的AI助手，支持多种风格和语调调整',
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
    aiModel: ['GPT-4', 'Claude'],
    createdAt: '2024-01-15',
    difficulty: 'beginner',
    language: 'zh',
    isLiked: false,
    isBookmarked: false,
  },
  {
    id: '2',
    title: 'Code Review Expert - Smart Code Optimization',
    description: 'Professional code review and optimization suggestions tool, supports multiple programming languages',
    category: '编程',
    tags: ['code', 'review', 'optimization', 'programming'],
    author: {
      username: 'CodeMaster',
      avatar: '',
      level: 'Expert',
    },
    likes: 987,
    views: 3456,
    comments: 67,
    aiModel: ['GPT-4', 'Copilot'],
    createdAt: '2024-01-14',
    difficulty: 'advanced',
    language: 'en',
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: '3',
    title: '数据分析师 - 深度洞察报告',
    description: '专业的数据分析和可视化助手，能够从复杂数据中提取有价值的商业洞察',
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
    aiModel: ['GPT-4', 'Claude'],
    createdAt: '2024-01-13',
    difficulty: 'intermediate',
    language: 'zh',
    isLiked: false,
    isBookmarked: true,
  },
];

const categories = ['写作', '编程', '数据分析', '设计', '营销', '教育', '其他'];
const aiModels = ['GPT-4', 'Claude', 'Gemini', 'Copilot', 'Midjourney'];
const difficulties = [
  { value: 'beginner', label: '初级' },
  { value: 'intermediate', label: '中级' },
  { value: 'advanced', label: '高级' },
  { value: 'expert', label: '专家' },
];
const languages = [
  { value: 'zh', label: '中文' },
  { value: 'en', label: 'English' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
];
const sortOptions = [
  { value: 'relevance', label: '相关性' },
  { value: 'latest', label: '最新发布' },
  { value: 'popular', label: '最受欢迎' },
  { value: 'mostLiked', label: '最多点赞' },
  { value: 'mostViewed', label: '最多浏览' },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState(searchResults);
  const [totalResults, setTotalResults] = useState(searchResults.length);
  const [currentPage, setCurrentPage] = useState(1);
  const [resultsPerPage] = useState(9);
  const [isLoading, setIsLoading] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [filters, setFilters] = useState({
    categories: [],
    aiModels: [],
    difficulties: [],
    languages: [],
    dateRange: [0, 365],
    likesRange: [0, 2000],
    viewsRange: [0, 10000],
  });
  const [activeFilters, setActiveFilters] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const debouncedSearchQuery = useDebounceSearch(searchQuery, 500);

  // 执行搜索
  const performSearch = async (query, currentFilters, sort) => {
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300)); // 模拟API调用
      
      let filteredResults = [...searchResults];
      
      // 应用搜索查询
      if (query.trim()) {
        filteredResults = filteredResults.filter(item => 
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
      }
      
      // 应用分类筛选
      if (currentFilters.categories.length > 0) {
        filteredResults = filteredResults.filter(item => 
          currentFilters.categories.includes(item.category)
        );
      }
      
      // 应用AI模型筛选
      if (currentFilters.aiModels.length > 0) {
        filteredResults = filteredResults.filter(item => 
          item.aiModel.some(model => currentFilters.aiModels.includes(model))
        );
      }
      
      // 应用难度筛选
      if (currentFilters.difficulties.length > 0) {
        filteredResults = filteredResults.filter(item => 
          currentFilters.difficulties.includes(item.difficulty)
        );
      }
      
      // 应用语言筛选
      if (currentFilters.languages.length > 0) {
        filteredResults = filteredResults.filter(item => 
          currentFilters.languages.includes(item.language)
        );
      }
      
      // 应用点赞数筛选
      filteredResults = filteredResults.filter(item => 
        item.likes >= currentFilters.likesRange[0] && item.likes <= currentFilters.likesRange[1]
      );
      
      // 应用浏览数筛选
      filteredResults = filteredResults.filter(item => 
        item.views >= currentFilters.viewsRange[0] && item.views <= currentFilters.viewsRange[1]
      );
      
      // 应用排序
      filteredResults.sort((a, b) => {
        switch (sort) {
          case 'latest':
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          case 'popular':
            return (b.likes + b.views + b.comments) - (a.likes + a.views + a.comments);
          case 'mostLiked':
            return b.likes - a.likes;
          case 'mostViewed':
            return b.views - a.views;
          case 'relevance':
          default:
            return 0; // 保持原有顺序
        }
      });
      
      setResults(filteredResults);
      setTotalResults(filteredResults.length);
      setCurrentPage(1);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // 监听搜索查询变化
  useEffect(() => {
    performSearch(debouncedSearchQuery, filters, sortBy);
  }, [debouncedSearchQuery, filters, sortBy]);

  // 更新筛选器
  const updateFilter = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  // 清除筛选器
  const clearFilter = (filterType, value) => {
    if (filterType === 'all') {
      setFilters({
        categories: [],
        aiModels: [],
        difficulties: [],
        languages: [],
        dateRange: [0, 365],
        likesRange: [0, 2000],
        viewsRange: [0, 10000],
      });
      setActiveFilters([]);
    } else if (Array.isArray(filters[filterType])) {
      updateFilter(filterType, filters[filterType].filter(item => item !== value));
    }
  };

  // 获取活跃筛选器
  useEffect(() => {
    const active = [];
    if (filters.categories.length > 0) {
      filters.categories.forEach(cat => active.push({ type: 'categories', value: cat, label: cat }));
    }
    if (filters.aiModels.length > 0) {
      filters.aiModels.forEach(model => active.push({ type: 'aiModels', value: model, label: model }));
    }
    if (filters.difficulties.length > 0) {
      filters.difficulties.forEach(diff => {
        const diffLabel = difficulties.find(d => d.value === diff)?.label || diff;
        active.push({ type: 'difficulties', value: diff, label: diffLabel });
      });
    }
    if (filters.languages.length > 0) {
      filters.languages.forEach(lang => {
        const langLabel = languages.find(l => l.value === lang)?.label || lang;
        active.push({ type: 'languages', value: lang, label: langLabel });
      });
    }
    setActiveFilters(active);
  }, [filters]);

  // 分页
  const totalPages = Math.ceil(totalResults / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = results.slice(startIndex, endIndex);

  const handleLike = (promptId) => {
    setResults(prev => prev.map(prompt => {
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

  const handleBookmark = (promptId) => {
    setResults(prev => prev.map(prompt => {
      if (prompt.id === promptId) {
        return {
          ...prompt,
          isBookmarked: !prompt.isBookmarked,
        };
      }
      return prompt;
    }));
  };

  return (
    <Box minH="100vh" bg="gray.900" color="white">
      <Navbar />
      
      <Container maxW="7xl" py={8}>
        <VStack spacing={8} align="stretch">
          {/* 页面标题 */}
          <Box textAlign="center">
            <Heading size="2xl" className="gradient-text" mb={4}>
              发现优质Prompt
            </Heading>
            <Text fontSize="lg" color="gray.400">
              探索社区精选的AI提示词，提升你的创作效率
            </Text>
          </Box>

          {/* 搜索栏 */}
          <Card.Root className="glass-effect">
              <Card.Body p={6}>
              <VStack spacing={4}>
                <InputGroup size="lg">
                  <Input
                    placeholder="搜索Prompt关键词、标签或描述..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    bg="rgba(255, 255, 255, 0.1)"
                    border="1px solid rgba(255, 255, 255, 0.2)"
                    _focus={{
                      borderColor: 'brand.500',
                      boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
                    }}
                    _placeholder={{ color: 'gray.400' }}
                  />
                </InputGroup>

                <Flex w="100%" justify="space-between" align="center" flexWrap="wrap" gap={4}>
                  <HStack spacing={4}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onOpen}
                      display={{ base: 'flex', lg: 'none' }}
                    >
                      <FaFilter />
                      筛选
                    </Button>
                    <Text fontSize="sm" color="gray.400">
                      找到 {totalResults} 个结果
                    </Text>
                  </HStack>
                  
                  <HStack spacing={4}>
                    <HStack spacing={2}>
                      <FaSort color="gray.400" />
                      <Text fontSize="sm" color="gray.400">排序:</Text>
                    </HStack>
                    <Select
                      size="sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      bg="rgba(255, 255, 255, 0.1)"
                      border="1px solid rgba(255, 255, 255, 0.2)"
                      w="auto"
                      minW="120px"
                    >
                      {sortOptions.map((option) => (
                        <option key={option.value} value={option.value} style={{ background: '#2D3748', color: 'white' }}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  </HStack>
                </Flex>

                {/* 活跃筛选器标签 */}
                {activeFilters.length > 0 && (
                  <Flex w="100%" flexWrap="wrap" gap={2}>
                    {activeFilters.map((filter, index) => (
                      <Tag
                        key={index}
                        size="sm"
                        variant="subtle"
                        bg="rgba(0, 255, 255, 0.2)"
                        color="brand.500"
                        display="flex"
                        alignItems="center"
                        gap={1}
                      >
                        <Text fontSize="sm">{filter.label}</Text>
                        <IconButton
                          size="xs"
                          variant="ghost"
                          color="brand.500"
                          icon={<FiX />}
                          onClick={() => clearFilter(filter.type, filter.value)}
                          aria-label="移除筛选"
                          minW="auto"
                          h="auto"
                          p={0}
                        />
                      </Tag>
                    ))}
                    <Button
                      size="xs"
                      variant="ghost"
                      color="gray.400"
                      onClick={() => clearFilter('all')}
                    >
                      清除全部
                    </Button>
                  </Flex>
                )}
              </VStack>
            </Card.Body>
            </Card.Root>

          {/* 搜索结果 */}
          {isLoading ? (
            <Flex justify="center" py={20}>
              <VStack spacing={4}>
                <Spinner size="xl" color="brand.500" thickness="4px" />
                <Text color="gray.400">搜索中...</Text>
              </VStack>
            </Flex>
          ) : currentResults.length === 0 ? (
            <Alert.Root
              status="info"
              variant="subtle"
              bg="rgba(0, 255, 255, 0.1)"
              borderColor="brand.500"
              borderWidth="1px"
              borderRadius="md"
            >
              <Alert.Indicator>
                <FiInfo color="var(--chakra-colors-brand-500)" />
              </Alert.Indicator>
              <Alert.Content>
                <Alert.Title color="white">未找到相关结果</Alert.Title>
                <Alert.Description color="gray.400">
                  尝试调整搜索关键词或筛选条件
                </Alert.Description>
              </Alert.Content>
            </Alert.Root>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
              {currentResults.map((prompt) => (
                <Card.Root
                  key={prompt.id}
                  className="glass-effect hover-glow"
                  cursor="pointer"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: 'translateY(-5px)',
                    boxShadow: '0 15px 40px rgba(0, 255, 255, 0.2)',
                  }}
                  as={NextLink}
                  href={`/detail/${prompt.id}`}
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
                        <Badge bg="rgba(0, 255, 255, 0.2)" color="brand.500">
                          {prompt.category}
                        </Badge>
                      </Flex>

                      {/* 标题和描述 */}
                      <VStack align="stretch" spacing={2}>
                        <Heading size="md" color="white" noOfLines={2}>
                          {prompt.title}
                        </Heading>
                        <Text fontSize="sm" color="gray.400" noOfLines={3}>
                          {prompt.description}
                        </Text>
                      </VStack>

                      {/* 标签 */}
                      <Flex flexWrap="wrap" gap={2}>
                        {prompt.tags.slice(0, 3).map((tag, index) => (
                          <Badge
                            key={index}
                            size="sm"
                            variant="outline"
                            borderColor="gray.600"
                            color="gray.300"
                          >
                            {tag}
                          </Badge>
                        ))}
                        {prompt.tags.length > 3 && (
                          <Badge
                            size="sm"
                            variant="outline"
                            borderColor="gray.600"
                            color="gray.400"
                          >
                            +{prompt.tags.length - 3}
                          </Badge>
                        )}
                      </Flex>

                      {/* AI模型 */}
                      <HStack spacing={2}>
                        <Text fontSize="xs" color="gray.500">支持:</Text>
                        {prompt.aiModel.slice(0, 2).map((model, index) => (
                          <Badge
                            key={index}
                            size="sm"
                            bg="rgba(255, 165, 0, 0.2)"
                            color="orange.300"
                          >
                            {model}
                          </Badge>
                        ))}
                        {prompt.aiModel.length > 2 && (
                          <Text fontSize="xs" color="gray.500">
                            +{prompt.aiModel.length - 2}
                          </Text>
                        )}
                      </HStack>

                      {/* 底部统计和操作 */}
                      <Flex justify="space-between" align="center" pt={2}>
                        <HStack spacing={4}>
                          <HStack spacing={1}>
                            <FiStar color="#FFD700" size={14} />
                            <Text fontSize="sm" color="gray.400">{prompt.likes}</Text>
                          </HStack>
                          <HStack spacing={1}>
                            <FiEye color="gray" size={14} />
                            <Text fontSize="sm" color="gray.400">{prompt.views}</Text>
                          </HStack>
                          <HStack spacing={1}>
                            <FiMessageCircle color="gray" size={14} />
                            <Text fontSize="sm" color="gray.400">{prompt.comments}</Text>
                          </HStack>
                        </HStack>
                        
                        <HStack spacing={2}>
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<FaHeart color={prompt.isLiked ? '#FF69B4' : '#718096'} />}
                            onClick={(e) => {
                              e.preventDefault();
                              handleLike(prompt.id);
                            }}
                            aria-label="点赞"
                          />
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<FaBookmark color={prompt.isBookmarked ? '#00FFFF' : '#718096'} />}
                            onClick={(e) => {
                              e.preventDefault();
                              handleBookmark(prompt.id);
                            }}
                            aria-label="收藏"
                          />
                          <IconButton
                            size="sm"
                            variant="ghost"
                            icon={<FaShare color="#718096" />}
                            aria-label="分享"
                          />
                        </HStack>
                      </Flex>
                    </VStack>
                  </Card.Body>
                </Card.Root>
              ))}
            </SimpleGrid>
          )}

          {/* 分页 */}
          {totalPages > 1 && (
            <Flex justify="center" mt={8}>
              <HStack spacing={2}>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  isDisabled={currentPage === 1}
                >
                  上一页
                </Button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
                  if (pageNum > totalPages) return null;
                  
                  return (
                    <Button
                      key={pageNum}
                      size="sm"
                      variant={currentPage === pageNum ? 'solid' : 'outline'}
                      bg={currentPage === pageNum ? 'brand.500' : 'transparent'}
                      onClick={() => setCurrentPage(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  isDisabled={currentPage === totalPages}
                >
                  下一页
                </Button>
              </HStack>
            </Flex>
          )}
        </VStack>
      </Container>
    </Box>
  );
}