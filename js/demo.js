// Demo Page JavaScript for 「慧视」AI金融洞察引擎

document.addEventListener('DOMContentLoaded', function() {
    initStockChart();
    initStockSelector();
    initTimeframeButtons();
    initThinkingProcess();
    initProbabilityAnimations();
});

let stockChart;
const stockData = {
    AAPL: {
        name: '苹果公司 (AAPL)',
        data: [175.2, 178.5, 182.1, 179.8, 185.3, 183.7, 187.2, 184.9, 189.1, 186.5],
        patterns: ['锤头线', '上升三角形'],
        trend: '短期看涨，成交量配合良好',
        support: '$175.20',
        resistance: '$185.50',
        probabilities: { up: 68, down: 22, sideways: 10 },
        sentiment: 75,
        summary: 'Q3财报显示营收增长12%，iPhone销量超预期，服务业务持续强劲增长。管理层对未来展望乐观，预计Q4将继续保持增长势头。'
    },
    TSLA: {
        name: '特斯拉 (TSLA)',
        data: [245.8, 252.3, 248.7, 255.1, 251.9, 258.4, 262.1, 259.7, 265.3, 261.8],
        patterns: ['突破形态', '成交量放大'],
        trend: '强势上涨，技术面良好',
        support: '$245.80',
        resistance: '$265.30',
        probabilities: { up: 72, down: 18, sideways: 10 },
        sentiment: 82,
        summary: '电动车交付量创新高，自动驾驶技术取得重大突破。能源业务增长迅速，全球扩张计划顺利推进。'
    },
    MSFT: {
        name: '微软 (MSFT)',
        data: [335.2, 342.1, 338.9, 345.7, 341.3, 348.2, 352.6, 349.8, 355.1, 351.4],
        patterns: ['上升通道', '稳定增长'],
        trend: '稳健上涨，基本面强劲',
        support: '$335.20',
        resistance: '$355.10',
        probabilities: { up: 65, down: 25, sideways: 10 },
        sentiment: 78,
        summary: '云计算业务持续强劲增长，AI产品线表现出色。企业客户需求旺盛，订阅模式收入稳定增长。'
    },
    GOOGL: {
        name: '谷歌 (GOOGL)',
        data: [125.8, 128.4, 131.2, 129.7, 133.5, 130.9, 135.1, 132.8, 137.3, 134.6],
        patterns: ['震荡上行', '量价配合'],
        trend: '震荡向上，搜索业务稳定',
        support: '$125.80',
        resistance: '$137.30',
        probabilities: { up: 58, down: 32, sideways: 10 },
        sentiment: 70,
        summary: '搜索广告收入稳定增长，YouTube业务表现强劲。AI技术投入加大，云计算市场份额提升。'
    },
    AMZN: {
        name: '亚马逊 (AMZN)',
        data: [145.3, 148.7, 152.1, 149.8, 154.2, 151.6, 156.8, 153.9, 158.4, 155.7],
        patterns: ['上升楔形', '成交量递增'],
        trend: '稳步上涨，电商恢复增长',
        support: '$145.30',
        resistance: '$158.40',
        probabilities: { up: 63, down: 27, sideways: 10 },
        sentiment: 73,
        summary: '电商业务恢复增长，AWS云服务保持领先地位。物流网络优化效果显著，成本控制能力提升。'
    }
};

function initStockChart() {
    const ctx = document.getElementById('stockChart').getContext('2d');
    
    stockChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'],
            datasets: [{
                label: '股价',
                data: stockData.AAPL.data,
                borderColor: '#4F46E5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#4F46E5',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#4F46E5',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false
                }
            },
            scales: {
                x: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6b7280'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)',
                        drawBorder: false
                    },
                    ticks: {
                        color: '#6b7280',
                        callback: function(value) {
                            return '$' + value.toFixed(2);
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart'
            }
        }
    });
}

function initStockSelector() {
    const stockSelect = document.getElementById('stockSelect');
    
    stockSelect.addEventListener('change', function() {
        const selectedStock = this.value;
        updateStockData(selectedStock);
    });
}

function updateStockData(symbol) {
    const data = stockData[symbol];
    if (!data) return;
    
    // Update chart title
    document.querySelector('.chart-title').textContent = `${data.name} 日线图及AI洞察`;
    
    // Update chart data with animation
    stockChart.data.datasets[0].data = data.data;
    stockChart.update('active');
    
    // Update AI analysis
    updateAIAnalysis(data);
    
    // Restart thinking process
    restartThinkingProcess();
}

function updateAIAnalysis(data) {
    // Update patterns
    const patternContainer = document.querySelector('.insight-value');
    patternContainer.innerHTML = '';
    data.patterns.forEach(pattern => {
        const tag = document.createElement('span');
        tag.className = 'pattern-tag';
        tag.textContent = pattern;
        patternContainer.appendChild(tag);
    });
    
    // Update trend
    document.querySelector('.trend-indicator').innerHTML = `
        <span class="trend-arrow">↗</span>
        ${data.trend}
    `;
    
    // Update price levels
    document.querySelector('.price-level.support .level-value').textContent = data.support;
    document.querySelector('.price-level.resistance .level-value').textContent = data.resistance;
    
    // Update probabilities with animation
    updateProbabilities(data.probabilities);
    
    // Update sentiment
    updateSentiment(data.sentiment);
    
    // Update summary
    document.querySelector('.summary-text').textContent = data.summary;
}

function updateProbabilities(probs) {
    const probItems = document.querySelectorAll('.probability-item');
    const values = [probs.up, probs.down, probs.sideways];
    
    probItems.forEach((item, index) => {
        const fill = item.querySelector('.prob-fill');
        const value = item.querySelector('.prob-value');
        
        // Animate width
        setTimeout(() => {
            fill.style.width = values[index] + '%';
            value.textContent = values[index] + '%';
        }, index * 200);
    });
}

function updateSentiment(sentiment) {
    const indicator = document.querySelector('.sentiment-indicator');
    setTimeout(() => {
        indicator.style.left = sentiment + '%';
    }, 500);
}

function initTimeframeButtons() {
    const buttons = document.querySelectorAll('.chart-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update chart based on timeframe
            const timeframe = this.dataset.timeframe;
            updateChartTimeframe(timeframe);
        });
    });
}

function updateChartTimeframe(timeframe) {
    let labels, multiplier;
    
    switch(timeframe) {
        case 'daily':
            labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Day 10'];
            multiplier = 1;
            break;
        case 'weekly':
            labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10'];
            multiplier = 1.1;
            break;
        case 'monthly':
            labels = ['Month 1', 'Month 2', 'Month 3', 'Month 4', 'Month 5', 'Month 6', 'Month 7', 'Month 8', 'Month 9', 'Month 10'];
            multiplier = 1.2;
            break;
    }
    
    const currentStock = document.getElementById('stockSelect').value;
    const baseData = stockData[currentStock].data;
    const newData = baseData.map(value => value * multiplier);
    
    stockChart.data.labels = labels;
    stockChart.data.datasets[0].data = newData;
    stockChart.update('active');
}

function initThinkingProcess() {
    const steps = document.querySelectorAll('.thinking-step');
    
    function animateSteps() {
        steps.forEach((step, index) => {
            step.classList.remove('completed', 'active');
            
            setTimeout(() => {
                if (index < steps.length - 1) {
                    step.classList.add('completed');
                } else {
                    step.classList.add('active');
                    setTimeout(() => {
                        step.classList.remove('active');
                        step.classList.add('completed');
                    }, 2000);
                }
            }, index * 1000);
        });
    }
    
    // Start animation
    animateSteps();
    
    // Repeat every 10 seconds
    setInterval(animateSteps, 10000);
}

function restartThinkingProcess() {
    const steps = document.querySelectorAll('.thinking-step');
    steps.forEach(step => {
        step.classList.remove('completed', 'active');
    });
    
    setTimeout(() => {
        initThinkingProcess();
    }, 500);
}

function initProbabilityAnimations() {
    // Add shimmer effect to probability bars
    const probFills = document.querySelectorAll('.prob-fill');
    
    probFills.forEach(fill => {
        setInterval(() => {
            const particles = fill.querySelector('.prob-particles');
            particles.style.animation = 'none';
            setTimeout(() => {
                particles.style.animation = 'shimmer 2s ease-in-out infinite';
            }, 100);
        }, 3000);
    });
}

// Add hover effects for narrative tags
document.addEventListener('DOMContentLoaded', function() {
    const narrativeTags = document.querySelectorAll('.narrative-tag');
    
    narrativeTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Initialize status indicator animation
document.addEventListener('DOMContentLoaded', function() {
    const statusIndicator = document.querySelector('.status-indicator.active');
    if (statusIndicator) {
        setInterval(() => {
            statusIndicator.style.animation = 'none';
            setTimeout(() => {
                statusIndicator.style.animation = 'pulse 1.5s ease-in-out infinite';
            }, 100);
        }, 5000);
    }
});
