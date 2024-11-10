interface CharCount {
    char: string;
    count: number;
}

function visualizeText() {
    // Get input text
    const text = (document.getElementById('textInput') as HTMLInputElement).value;
    
    // Process text into character frequency data
    const charCounts = new Map<string, number>();
    
    text.split('').forEach(char => {
        if (char.trim()) { // Skip whitespace
            charCounts.set(char, (charCounts.get(char) || 0) + 1);
        }
    });
    
    // Convert to array for D3
    const data: CharCount[] = Array.from(charCounts.entries()).map(([char, count]) => ({
        char,
        count
    }));
    
    // Sort by frequency
    data.sort((a, b) => b.count - a.count);
    
    // Clear previous chart
    d3.select('#chart').html('');
    
    // Set up dimensions
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 700 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Create SVG
    const svg = d3.select('#chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    
    // Set up scales
    const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);
    
    const y = d3.scaleLinear()
        .range([height, 0]);
    
    // Set domains
    x.domain(data.map(d => d.char));
    y.domain([0, d3.max(data, d => d.count) || 0]);
    
    // Add bars
    svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.char) || 0)
        .attr('width', x.bandwidth())
        .attr('y', d => y(d.count))
        .attr('height', d => height - y(d.count));
    
    // Add x axis
    svg.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));
    
    // Add y axis
    svg.append('g')
        .call(d3.axisLeft(y));
}
