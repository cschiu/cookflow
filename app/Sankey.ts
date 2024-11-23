import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';

import { Node, Link } from './RMLGraphGenerator.js'

// Define interfaces for our data structure


export interface SankeyData {
    nodes: Node[];
    links: Link[];
}

export class SankeyDiagram {
    private svg: d3.Selection<SVGGElement, unknown, HTMLElement, any>;
    private width: number;
    private height: number;
    private margin = { top: 20, right: 20, bottom: 20, left: 20 };

    constructor(container: string, width: number, height: number) {
        this.width = width - this.margin.left - this.margin.right;
        this.height = height - this.margin.top - this.margin.bottom;

        // clear previous chart
        d3.select(container).html('');

        // Create SVG
        this.svg = d3.select(container)
            .append('svg')
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${this.margin.left},${this.margin.top})`);
    }

    public render(data: SankeyData): void {
        // Create a copy of the data since sankey modifies it
        const sankeyData: d3Sankey.SankeyGraph<Node, Link> = {
            nodes: data.nodes.map(d => ({...d})),
            links: data.links.map(d => ({...d}))
        };

        // Create sankey generator
        const sankeyGenerator = d3Sankey.sankey<Node, Link>()
            .nodeId(d => d.name)
            .nodeAlign(d3Sankey.sankeyLeft)
            .nodeWidth(15)
            .nodePadding(10)
            .extent([[0, 0], [this.width, this.height]]);

        // Generate the sankey diagram
        const { nodes, links } = sankeyGenerator(sankeyData);

        // Color scale for nodes
        const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

        // Draw the links
        const link = this.svg.append('g')
            .selectAll('path')
            .data(links)
            .join('path')
            .attr('d', d3Sankey.sankeyLinkHorizontal())
            .attr('stroke-width', d => Math.max(1, (d as any).width))
            .attr('stroke', d => colorScale((d.source as any).name))
            .attr('fill', 'none')
            .attr('opacity', 0.5);

        // Add hover effects to links
        link.append('title')
            .text(d => `${(d.source as any).name} → ${(d.target as any).name}\n${d.value} grams`);

        // Draw the nodes
        const node = this.svg.append('g')
            .selectAll('rect')
            .data(nodes)
            .join('rect')
            .attr('x', d => d.x0!)
            .attr('y', d => d.y0!)
            .attr('height', d => d.y1! - d.y0!)
            .attr('width', d => d.x1! - d.x0!)
            .attr('fill', d => colorScale(d.name))
            .attr('opacity', 0.8);

        // Add hover effects to nodes
        node.append('title')
            .text(d => `${d.name}\n${d.label}`);

        // Add node labels
        this.svg.append('g')
            .selectAll('text')
            .data(nodes)
            .join('text')
            .attr('x', d => d.x0! < this.width / 2 ? d.x1! + 6 : d.x0! - 6)
            .attr('y', d => (d.y1! + d.y0!) / 2)
            .attr('dy', '0.35em')
            .attr('text-anchor', d => d.x0! < this.width / 2 ? 'start' : 'end')
            .text(d => d.name)
            .style('font-size', '10px');
    }

    public clear(): void {
        this.svg.selectAll('*').remove();
    }
}