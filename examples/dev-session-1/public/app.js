/**
 * TaskFlow Pro - Vue.js 3 Application
 * Claude Code Training Session - Developer Session 1
 *
 * This is the main application entry point. During the training session,
 * attendees will expand this basic structure to build a complete task management system.
 *
 * Learning Focus:
 * - Vue 3 Composition API patterns
 * - API integration with json-server
 * - Component architecture and data flow
 * - Claude Code subagent demonstrations
 */

const { createApp, ref, reactive, computed, onMounted } = Vue;

// Main Application
const TaskFlowApp = {
    setup() {
        // --- Reactive State ---
        const loading = ref(true);
        const error = ref(null);
        const apiBase = 'http://localhost:3001/api';

        // Data stores (will be expanded during session)
        const tasks = ref([]);
        const projects = ref([]);
        const users = ref([]);

        // UI state
        const currentView = ref('dashboard');
        const selectedProject = ref(null);

        // --- Computed Properties ---
        const tasksInProgress = computed(() =>
            tasks.value.filter(task => task.status === 'in_progress')
        );

        const completedTasks = computed(() =>
            tasks.value.filter(task => task.status === 'completed')
        );

        const todoTasks = computed(() =>
            tasks.value.filter(task => task.status === 'todo')
        );

        // --- API Functions ---
        async function fetchData() {
            try {
                loading.value = true;
                error.value = null;

                // Parallel API calls (will demonstrate Claude Code @explain for async patterns)
                const [tasksResponse, projectsResponse, usersResponse] = await Promise.all([
                    fetch(`${apiBase}/tasks`),
                    fetch(`${apiBase}/projects`),
                    fetch(`${apiBase}/users`)
                ]);

                if (!tasksResponse.ok || !projectsResponse.ok || !usersResponse.ok) {
                    throw new Error('Failed to fetch data from API');
                }

                tasks.value = await tasksResponse.json();
                projects.value = await projectsResponse.json();
                users.value = await usersResponse.json();

                console.log('📊 Data loaded successfully:', {
                    tasks: tasks.value.length,
                    projects: projects.value.length,
                    users: users.value.length
                });

            } catch (err) {
                error.value = err.message;
                console.error('❌ Error loading data:', err);
            } finally {
                loading.value = false;
            }
        }

        // --- Utility Functions ---
        function getUserById(userId) {
            return users.value.find(user => user.id === userId);
        }

        function getProjectById(projectId) {
            return projects.value.find(project => project.id === projectId);
        }

        function formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }

        // --- Lifecycle ---
        onMounted(() => {
            console.log('🚀 TaskFlow Pro initialized - Ready for Claude Code training!');
            fetchData();
        });

        // --- Return (expose to template) ---
        return {
            // State
            loading,
            error,
            tasks,
            projects,
            users,
            currentView,
            selectedProject,

            // Computed
            tasksInProgress,
            completedTasks,
            todoTasks,

            // Methods
            fetchData,
            getUserById,
            getProjectById,
            formatDate
        };
    },

    template: `
        <!-- Loading State -->
        <div v-if="loading" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-4xl text-blue-500 mb-4"></i>
                <p class="text-gray-600">Loading TaskFlow Pro...</p>
                <p class="text-sm text-gray-500 mt-2">Fetching tasks, projects, and team data</p>
            </div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <i class="fas fa-exclamation-triangle text-red-500 text-4xl mb-4"></i>
                <h2 class="text-xl font-semibold text-red-800 mb-2">Connection Error</h2>
                <p class="text-red-700 mb-4">{{ error }}</p>
                <p class="text-sm text-red-600 mb-4">
                    Make sure the json-server is running on port 3001
                </p>
                <button
                    @click="fetchData"
                    class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    <i class="fas fa-redo mr-2"></i>Retry
                </button>
            </div>
        </div>

        <!-- Main Application Content -->
        <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

            <!-- Dashboard Overview -->
            <div class="mb-8">
                <h2 class="text-3xl font-bold text-gray-900 mb-2">Team Dashboard</h2>
                <p class="text-gray-600">
                    Welcome to TaskFlow Pro training session!
                    <span class="text-blue-600 font-medium">{{ tasks.length }} tasks</span> across
                    <span class="text-green-600 font-medium">{{ projects.length }} projects</span>
                </p>
            </div>

            <!-- Stats Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <!-- Todo Tasks -->
                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <i class="fas fa-list text-gray-400 text-2xl"></i>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-sm font-medium text-gray-500 truncate">
                                        To Do
                                    </dt>
                                    <dd class="text-lg font-medium text-gray-900">
                                        {{ todoTasks.length }}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- In Progress Tasks -->
                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <i class="fas fa-clock text-blue-400 text-2xl"></i>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-sm font-medium text-gray-500 truncate">
                                        In Progress
                                    </dt>
                                    <dd class="text-lg font-medium text-gray-900">
                                        {{ tasksInProgress.length }}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Completed Tasks -->
                <div class="bg-white overflow-hidden shadow rounded-lg">
                    <div class="p-5">
                        <div class="flex items-center">
                            <div class="flex-shrink-0">
                                <i class="fas fa-check-circle text-green-400 text-2xl"></i>
                            </div>
                            <div class="ml-5 w-0 flex-1">
                                <dl>
                                    <dt class="text-sm font-medium text-gray-500 truncate">
                                        Completed
                                    </dt>
                                    <dd class="text-lg font-medium text-gray-900">
                                        {{ completedTasks.length }}
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Session Instructions -->
            <div class="bg-blue-50 border-l-4 border-blue-400 p-6 mb-8">
                <div class="flex">
                    <div class="flex-shrink-0">
                        <i class="fas fa-info-circle text-blue-400 text-xl"></i>
                    </div>
                    <div class="ml-3">
                        <h3 class="text-lg font-medium text-blue-800">
                            🎯 Training Session: Ready to Build!
                        </h3>
                        <div class="mt-2 text-sm text-blue-700">
                            <p class="mb-2">
                                This basic dashboard shows our task data. During the session, we'll use Claude Code to:
                            </p>
                            <ul class="list-disc list-inside space-y-1 ml-4">
                                <li><strong>@explain</strong> - Understand Vue.js patterns and API structure</li>
                                <li><strong>@docu</strong> - Generate comprehensive documentation</li>
                                <li><strong>Custom subagents</strong> - Create specialized code reviewers and validators</li>
                                <li><strong>Build components</strong> - TaskList, TaskForm, and TaskCard with Claude's help</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Task Components Will Be Added Here During Session -->
            <div class="space-y-8">
                <!-- Placeholder for TaskList component -->
                <div class="bg-white shadow rounded-lg p-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">
                        📝 Task Components (To Be Built)
                    </h3>
                    <p class="text-gray-600">
                        We'll create Vue.js components here during the session using Claude Code guidance.
                    </p>
                </div>
            </div>
        </div>
    `
};

// Initialize Application
const app = createApp(TaskFlowApp);

// Global error handler
app.config.errorHandler = (err, instance, info) => {
    console.error('Vue Error:', err, info);
};

// Mount the application
app.mount('#app');